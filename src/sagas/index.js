import createHistory from 'history/createBrowserHistory'
import { all, takeLatest } from 'redux-saga/effects'
// import { saga as rpcSaga } from '../middleware/rpc'
import { setUrl } from 'app/actions'

const history = createHistory()

export function * watchSetUrl () {
  yield takeLatest(setUrl.type, ({ payload }) => history.push(payload))
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function * rootSaga (getFirebase) {
  // yield all([watchSetUrl(), rpcSaga(getFirebase)])
}
