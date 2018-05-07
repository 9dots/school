import createBrowserHistory from 'history/createBrowserHistory'
import { createStore, applyMiddleware, compose } from 'redux'
import fetch, { fetchEncodeJSON } from 'redux-effects-fetch'
import { reactReduxFirebase } from 'react-redux-firebase'
import { reduxFirestore } from 'redux-firestore'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import rootReducer from './app/reducers'
import effects from 'redux-effects'
import firebase from 'firebase'
import thunk from 'redux-thunk'
import 'firebase/firestore'

const history = createBrowserHistory()
const config = {
  apiKey: 'AIzaSyBu6M3-jHVZqDxh6QSsD5ydDEWzB23Ng34',
  authDomain: 'school-5927d.firebaseapp.com',
  databaseURL: 'https://school-5927d.firebaseio.com',
  projectId: 'school-5927d'
}

firebase.initializeApp(config)
const firestore = firebase.firestore()
const settings = { timestampsInSnapshots: true }
firestore.settings(settings)

const rrfbConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  updateProfileOnLogin: false
  // onAuthStateChanged: () =>
  //   firebase
  //     .auth()
  //     .currentUser.getToken()
  //     .then(console.log)
}

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfbConfig),
  reduxFirestore(firebase)
)(createStore)

export { history }
export default (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [
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
