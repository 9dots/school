import createBrowserHistory from 'history/createBrowserHistory'
import { createStore, applyMiddleware, compose } from 'redux'
import fetch, { fetchEncodeJSON } from 'redux-effects-fetch'
import { reactReduxFirebase } from 'react-redux-firebase'
import { reduxFirestore } from 'redux-firestore'
import createSagaMiddleware from 'redux-saga'
import createDebounce from 'redux-debounced'
import { createLogger } from 'redux-logger'
import * as middlewares from 'middleware'
import rootReducer from './app/reducers'
import effects from 'redux-effects'
import getConfig from './getConfig'
import firebase from 'firebase'
import thunk from 'redux-thunk'
import 'firebase/firestore'

const history = createBrowserHistory()
const config = getConfig()

firebase.initializeApp(config)
const firestore = firebase.firestore()
const settings = { timestampsInSnapshots: true }
firestore.settings(settings)

const rrfbConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  updateProfileOnLogin: false,
  onAuthStateChanged: (user, firebase, dispatch) => {
    if (user && Object.keys(user.providerData).length) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://apis.google.com/js/api.js'
      script.onload = function (e) {
        // Initialize the Google API Client with the config object
        window.gapi.load('client', {
          callback: function () {
            window.gapi.client
              .init({
                apiKey: config.apiKey,
                clientId: config.clientId,
                discoveryDocs: config.discoveryDocs,
                scope: config.scopes.join(' ')
              })
              // Loading is finished, so start the app
              .then(function () {
                // Make sure the Google API Client is properly signed in
                if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
                  console.log('ready')
                } else {
                  firebase.auth().signOut() // Something went wrong, sign out
                }
              })
          }
        })
      }
      // Add to the document
      document.getElementsByTagName('head')[0].appendChild(script)
    }
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
    thunk.withExtraArgument(history),
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
