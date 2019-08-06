import { combineReducers } from 'redux'

import settings from '../services/settingsReducer'
import signin from '../components/Signin/redux'
import signup from '../components/Signup/redux'
import verify from '../components/Verify/redux'
import reverify from '../components/Reverify/redux'

export default combineReducers({
  settings,
  signin,
  signup,
  verify,
  reverify,
})
