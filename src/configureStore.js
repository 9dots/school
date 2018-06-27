import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import createBrowserHistory from 'history/createBrowserHistory'
import { createStore, applyMiddleware, compose } from 'redux'
import fetch, { fetchEncodeJSON } from 'redux-effects-fetch'
import rootReducer, { setAccessToken } from './app/reducers'
import { reduxFirestore } from 'redux-firestore'
import createSagaMiddleware from 'redux-saga'
import createDebounce from 'redux-debounced'
import { createLogger } from 'redux-logger'
import * as middlewares from 'middleware'
import effects from 'redux-effects'
import getConfig from './getConfig'
import firebase from 'firebase/app'
import thunk from 'redux-thunk'
import 'firebase/firestore'
import 'firebase/auth'

const history = createBrowserHistory()
const config = getConfig()

firebase.initializeApp(config)
const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })
firestore.enablePersistence()

const script = document.createElement('script')
script.type = 'text/javascript'
script.src = 'https://apis.google.com/js/api.js'

document.getElementsByTagName('head')[0].appendChild(script)
const rrfbConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  updateProfileOnLogin: false,
  onAuthStateChanged: (user, firebase, dispatch) => {
    if (user && Object.keys(user.providerData).length) {
      // script.onload = function (e) {
      // Initialize the Google API Client with the config object
      window.gapi.load('client', {
        callback: () => {
          window.gapi.client
            .init({
              apiKey: config.apiKey,
              clientId: config.clientId,
              discoveryDocs: config.discoveryDocs,
              access_type: 'offline',
              scope: config.scopes.join(' ')
            })
            .then(() => {
              return dispatch(
                setAccessToken(
                  window.gapi.auth2
                    .getAuthInstance()
                    .currentUser.get()
                    .getAuthResponse().access_token
                )
              )
            })
        }
      })
    }
    // Add to the document
  }
}

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfbConfig),
  reduxFirestore(firebase)
)(createStore)

export { history, config }
export default (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [
    middlewares.authRequired,
    createDebounce(),
    thunk.withExtraArgument({ history, getFirebase }),
    fetchEncodeJSON,
    sagaMiddleware,
    // createLogger(),
    effects,
    fetch
  ]
  const store = createStoreWithFirebase(
    rootReducer,
    {}, // initial state
    applyMiddleware(...middleware)
  )
  return store
}
