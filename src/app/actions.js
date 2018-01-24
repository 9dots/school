import { getFirebase } from 'react-redux-firebase'
import createAction from '@f/create-action'
import fetch from 'isomorphic-fetch'

const setUrl = createAction('SET_URL')

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

export { setUrl, rpc }