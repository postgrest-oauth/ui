import { all } from 'redux-saga/effects'

import signup from '../components/Signup/saga'
import verify from '../components/Verify/saga'

export default function* rootSaga() {
  yield all([...signup, ...verify])
}
