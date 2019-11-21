import { takeLatest, put, call, select } from 'redux-saga/effects'

import api from '../../api'
import { actions } from './redux'

function* verify() {
  try {
    const data = yield select(state => state.verify)
    yield call(api.verify, { code: data.verifyCode })
    yield put(actions.submit.success())
  } catch (err) {
    console.log(err)
    const message = err.response ? err.response.data.message : null
    yield put(actions.submit.failure(message))
  }
}

export default [takeLatest(actions.submit.request, verify)]
