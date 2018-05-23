import { getFirebase } from 'react-redux-firebase'
import fetch from 'isomorphic-fetch'
import getConfig from 'getConfig'

const config = getConfig()

const rpc = (method, data, meta) => {
  const thunk = async dispatch => {
    const idToken = await getIdToken()
    return apiRequest(`api/${method}`, data, 'Bearer ' + idToken)
  }
  thunk.meta = meta
  return thunk
}

const studentSignIn = data => async dispatch => {
  try {
    const { token } = await apiRequest('studentSignIn', data)
    return signInWithToken(token)
  } catch (e) {
    return Promise.reject(e)
  }
}

function apiRequest (endpoint, data, Authorization) {
  return fetch(`${config.apiServer}/${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => (res.status === 500 ? Promise.reject(res) : res.json()))
    .then(res => (res.ok ? res : Promise.reject(res)))
}

function signInWithToken (token) {
  return getFirebase()
    .auth()
    .signInWithCustomToken(token)
}

function getIdToken () {
  try {
    return getFirebase()
      .auth()
      .currentUser.getIdToken()
  } catch (e) {
    return Promise.resolve('')
  }
}

const setUrl = (url, opts = {}) => (dispatch, getState, history) =>
  history.push(url, opts)

export { setUrl, rpc, studentSignIn }
