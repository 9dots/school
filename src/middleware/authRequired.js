import { showModal } from 'ducks/modals'

export default function checkAuthMw ({ getState, dispatch }) {
  return next => action => {
    if (action.meta && action.meta.authRequired) {
      if (!getState().firebase.auth.uid) {
        return dispatch(showModal('loginModal'))
      }
    }
    return next(action)
  }
}
