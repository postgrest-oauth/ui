import { takeLatest, put, call, select } from 'redux-saga/effects'

import api from '../../api'
import { actions } from './redux'
import { t } from '../../utils/translate'

function* verify() {
  try {
    const data = yield select(state => state.verify)
    const code = parseInt(data.verifyCode, 10)
    console.log('type = ', typeof code)
    yield call(api.verify, { code: code })
    yield put(actions.submit.success())
  } catch (err) {
    console.log(err)
    const message = err.response ? err.response.data.message : t('generalError')
    yield put(actions.submit.failure(message))
  }
}

export default [takeLatest(actions.submit.request, verify)]
