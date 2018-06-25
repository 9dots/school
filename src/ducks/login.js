import { config } from '../configureStore'
import apiRequest from 'utils/api'
import { auth } from 'firebase'

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

// function signInWIthCredential (cred, firebase) {
//   console.log(firebase)
//   // return firebase.lo
// }

function signInWithToken (token) {
  return auth().signInWithCustomToken(token)
}

export { login, studentSignIn }
