import fetch from 'isomorphic-fetch'
import { config } from '../configureStore'

export default function (endpoint, data, Authorization) {
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
