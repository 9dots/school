import { all } from 'redux-saga/effects'

// Examples
// export function * helloSaga () {
//   yield delay(2000)
//   yield put({ type: 'JAM' })
// }

// export function * hi () {
//   yield takeLatest('HI', helloSaga)
// }

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function * rootSaga () {
  yield all([])
}
