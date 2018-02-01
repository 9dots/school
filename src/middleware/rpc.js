import { call, put, takeLatest } from 'redux-saga/effects'
import createAction from '@f/create-action'
import fetch from 'isomorphic-fetch'
import { rpc } from '../app/actions'
import map from '@f/map'

const setRpcChannel = createAction('<RPC:/>: SET_RPC_CHANNEL')

function mapToDispatch (methodFamily, methods, dispatch) {
  return map(
    (v, method) => (args, onComplete, onError) =>
      dispatch(rpc(`${methodFamily}.${method}`, args, onComplete, onError)),
    methods
  )
}

export default (name, url) => ({ getState, dispatch }) => {
  fetch(url)
    .then(res => res.json())
    .then(fns =>
      dispatch(
        setRpcChannel({
          name,
          fns: map(
            (methods, methodFamily) =>
              mapToDispatch(methodFamily, methods, dispatch),
            fns
          )
        })
      )
    )
    .catch(console.warn)
  return next => action => next(action)
}

export function reducer (state = {}, action) {
  switch (action.type) {
    case setRpcChannel.type:
      return {
        ...state,
        [action.payload.name]: action.payload.fns
      }
  }
  return state
}

export function * saga (getFirebase) {
  yield takeLatest(rpc.type, action => handleRpc(getFirebase, action))
}

export function runRpc ({ method, args }, idToken) {
  return fetch(`/api/${method}`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + idToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(args)
  }).then(res => res.json())
}

function getIdToken (getFirebase) {
  return getFirebase()
    .auth()
    .currentUser.getIdToken()
}

function * handleRpc (getFirebase, { payload }) {
  try {
    const response = yield call(runRpc, payload, yield getIdToken(getFirebase))
    if (!response.ok) {
      throw new Error(response.error)
    }
    yield put(payload.onSuccess(response))
  } catch (e) {
    yield put(payload.onError(e))
  }
}
