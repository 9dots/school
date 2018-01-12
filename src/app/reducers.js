import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import { combineReducers } from 'redux'

function main (state = {}, action) {
  return state
}

export default combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  main
})
