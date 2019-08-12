import { takeLatest, put, call, select } from 'redux-saga/effects'

import api from '../../api'
import { actions } from './redux'

function* resetPassword() {
  try {
    const data = yield select(state => state.resetPassword)
    const body = {
      code: data.code,
      password: data.password.replace(/\s/g, ''),
    }
    yield call(api.passwordReset, body)
    yield put(actions.submit.success())
  } catch (err) {
    console.log(err)
    const message = err.response ? err.response.data.message : null
    yield put(actions.submit.failure(message))
  }
}

export default [takeLatest(actions.submit.request, resetPassword)]
