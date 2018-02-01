import { reducer as rpcReducer } from '../middleware/rpc'
import { firebaseReducer } from 'react-redux-firebase'
import { reducer as formReducer } from 'redux-form'
import { firestoreReducer } from 'redux-firestore'
import modalReducer from '../ducks/modals'
import { combineReducers } from 'redux'

function main (state = {}, action) {
  return state
}

export default combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  modal: modalReducer,
  form: formReducer,
  rpc: rpcReducer,
  main
})
