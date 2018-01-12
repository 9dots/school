import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import { createStore, applyMiddleware, compose } from 'redux'
import { reduxFirestore } from 'redux-firestore'
import createSagaMiddleware from 'redux-saga'
import location from 'redux-effects-location'
import { createLogger } from 'redux-logger'
import rootReducer from './app/reducers'
import firebase from 'firebase'
import rootSaga from './sagas'
import 'firebase/firestore'

// const loggerMiddleware = createLogger()

var config = {
  apiKey: 'AIzaSyBu6M3-jHVZqDxh6QSsD5ydDEWzB23Ng34',
  authDomain: 'school-5927d.firebaseapp.com',
  databaseURL: 'https://school-5927d.firebaseio.com',
  projectId: 'school-5927d'
}

firebase.initializeApp(config)
firebase.firestore()

const rrfbConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  // enableRedirectHandling: false,
  onRedirectResult: (authData, firebase, dispatch) =>
    console.log(authData, (firebase.auth().currentUser || {}).uid, 'redirect')
}

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfbConfig),
  reduxFirestore(firebase)
)(createStore)

export default (initialState = {}, history) => {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [sagaMiddleware, location(), createLogger()]
  const store = createStoreWithFirebase(
    rootReducer,
    {}, // initial state
    applyMiddleware(...middleware)
  )
  sagaMiddleware.run(rootSaga, getFirebase)
  return store
}

// export default function configureStore (preloadedState) {
//   const createStoreWithFirebase = compose(
//     reactReduxFirebase(firebase, rrfbConfig),
//     reduxFirestore(firebase)
//   )(createStore)
//   return createStoreWithFirebase(
//     rootReducer,
//     preloadedState,
//     applyMiddleware(, location())
//   )
// }
