import { takeLatest, put, call, select } from 'redux-saga/effects'

import api from '../../api'
import { actions } from './redux'

function* submit() {
  try {
    const { username, variant } = yield select(state => state.emailForm)
    const request = variant === 'verify' ? api.reverify : api.passwordRequest
    yield call(request, { username: username.replace(/\s/g, '') })
    yield put(actions.submit.success())
  } catch (err) {
    console.log(err)
    const message = err.response ? err.response.data.message : null
    yield put(actions.submit.failure(message))
  }
}

export default [takeLatest(actions.submit.request, submit)]
