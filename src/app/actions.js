import { getFirebase } from 'react-redux-firebase'
import apiRequest from 'utils/api'

const rpc = (method, data, meta) => {
  const thunk = async dispatch => {
    const idToken = await getIdToken()
    return apiRequest(`api/${method}`, data, 'Bearer ' + idToken)
  }
  thunk.meta = meta
  return thunk
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

const setUrl = (url, opts = {}) => (dispatch, getState, { history }) =>
  history.push(url, opts)

const replaceUrl = (url, opts = {}) => (dispatch, getState, { history }) =>
  history.replace(url, opts)

export { setUrl, replaceUrl, rpc }
