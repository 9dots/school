import { getFirebase } from 'react-redux-firebase'
import fetch from 'isomorphic-fetch'

const rpc = (method, data, meta) => {
  const thunk = async dispatch => {
    const idToken = await getIdToken()
    return apiRequest(`api/${method}`, data, 'Bearer ' + idToken)
  }
  thunk.meta = meta
  return thunk
}

const studentSignIn = data => async dispatch => {
  const { token } = await apiRequest('studentSignIn', data)
  return signInWithToken(token)
}

function apiRequest (endpoint, data, Authorization) {
  return fetch(`${process.env.REACT_APP_API_SERVER}/${endpoint}`, {
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

const setUrl = (url, opts = {}) => (dispatch, getState, history) => {
  return history.push(url, opts)
}

export { setUrl, rpc, studentSignIn }
