import { all } from 'redux-saga/effects'

import signin from '../components/Signin/saga'
import signup from '../components/Signup/saga'
import verify from '../components/Verify/saga'
import emailForm from '../components/EmailForm/saga'
import resetPassword from '../components/ResetPassword/saga'

export default function* rootSaga() {
  yield all([...signin, ...signup, ...verify, ...emailForm, ...resetPassword])
}
