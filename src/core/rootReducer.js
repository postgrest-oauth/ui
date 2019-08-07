import { combineReducers } from 'redux'

import settings from '../services/settingsReducer'
import signin from '../components/Signin/redux'
import signup from '../components/Signup/redux'
import verify from '../components/Verify/redux'
import emailForm from '../components/EmailForm/redux'
import resetPassword from '../components/ResetPassword/redux'

export default combineReducers({
  settings,
  signin,
  signup,
  verify,
  emailForm,
  resetPassword,
})
