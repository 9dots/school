import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import createAction from '@f/create-action'
import modalReducer from '../ducks/modals'
import { combineReducers } from 'redux'

const setAccessToken = createAction('SET_ACCESS_TOKEN')

function auth (state = {}, action) {
  switch (action.type) {
    case setAccessToken.type:
      return {
        ...state,
        access_token: action.payload
      }
  }
  return state
}

export default combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  modal: modalReducer,
  auth
})

export { setAccessToken }
