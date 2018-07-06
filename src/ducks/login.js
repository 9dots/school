import { replaceUrl } from 'app/actions'
import { auth } from 'firebase/app'
import apiRequest from 'utils/api'

const login = () => async () => {
  const { url } = await apiRequest('googleSignIn')
  window.location = url
}

const studentSignIn = data => async () => {
  try {
    const { token } = await apiRequest('studentSignIn', data)
    return signInWithToken(token)
  } catch (e) {
    return Promise.reject(e)
  }
}

function signInWithCredential (token) {
  return async (dispatch, s, { getFirebase }) => {
    await getFirebase().login({
      credential: auth.GoogleAuthProvider.credential(null, token)
    })
    return dispatch(replaceUrl('/', false))
  }
}

function signInWithToken (token) {
  return auth().signInWithCustomToken(token)
}

export { login, studentSignIn, signInWithCredential }
