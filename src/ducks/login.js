import { config } from '../configureStore'
import { auth } from 'firebase/app'
import apiRequest from 'utils/api'

const login = () => (dispatch, store, { getFirebase }) => {
  return getFirebase().login({ provider: 'google', scopes: config.scopes })
}

const studentSignIn = data => async () => {
  try {
    const { token } = await apiRequest('studentSignIn', data)
    return signInWithToken(token)
  } catch (e) {
    return Promise.reject(e)
  }
}

function signInWithToken (token) {
  return auth().signInWithCustomToken(token)
}

export { login, studentSignIn }
