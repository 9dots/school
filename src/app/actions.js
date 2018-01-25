import { getFirebase } from 'react-redux-firebase'
import createAction from '@f/create-action'
import fetch from 'isomorphic-fetch'

const rpc = (method, data) => dispatch =>
  getIdToken(getFirebase)
    .then(idToken =>
      fetch(`${process.env.REACT_APP_API_SERVER}/api/${method}`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + idToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    )
    .then(res => res.json())

function getIdToken (getFirebase) {
  return getFirebase()
    .auth()
    .currentUser.getIdToken()
}

const setUrl = (history, url, opts = {}) => dispatch => {
  console.log(history, url)
  return history.push(url, opts)
}

export { setUrl, rpc }
