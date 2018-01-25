import { profileReducer } from '../middleware/profileUpdating'
import { reducer as rpcReducer } from '../middleware/rpc'
import { firebaseReducer } from 'react-redux-firebase'
import { reducer as formReducer } from 'redux-form'
import { firestoreReducer } from 'redux-firestore'
import { combineReducers } from 'redux'

function main (state = {}, action) {
  return state
}

export default combineReducers({
  profileReady: profileReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  form: formReducer,
  rpc: rpcReducer,
  main
})
