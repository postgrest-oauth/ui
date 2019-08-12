import { takeLatest, put, call, select } from 'redux-saga/effects'

import api from '../../api'
import { actions } from './redux'

function* signin() {
  try {
    const data = yield select(state => state.signin)
    const { search } = yield select(state => state.settings)
    const body = {
      username: data.username.replace(/\s/g, ''),
      password: data.password.replace(/\s/g, ''),
    }
    yield call(api.signin, body)
    yield window.location.assign(`${process.env.REACT_APP_OAUTH_API_URL}/authorize${search}`)
  } catch (err) {
    console.log(err)
    const message = err.response ? err.response.data.message : null
    yield put(actions.submit.failure(message))
  }
}

export default [takeLatest(actions.submit.request, signin)]
