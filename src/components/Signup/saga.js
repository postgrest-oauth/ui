import { takeLatest, put, call, select } from 'redux-saga/effects'

import api from '../../api'
import { actions } from './redux'
import { t } from '../../utils/translate'

function* signup() {
  try {
    const data = yield select(state => state.signup)
    const body = {
      email: data.email.replace(/\s/g, ''),
      password: data.password.replace(/\s/g, ''),
      phone: data.phone.replace(/\s/g, ''),
    }
    yield call(api.signup, body)
    yield put(actions.submit.success())
  } catch (err) {
    console.log(err)
    const message = err.response ? err.response.data.message : t('generalError')
    yield put(actions.submit.failure(message))
  }
}

export default [takeLatest(actions.submit.request, signup)]
