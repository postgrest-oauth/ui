import { createAction, createReducer } from 'redux-act'
import { createActions } from '../../utils/redux'

const defaultState = {
  inProgress: false,
  error: false,
  errorText: null,
  verifyCode: '',
  validateError: false,
  validateText: '',
  success: false,
}

const changeField = createAction('VERIFY_CHANGE_FIELD')
const submit = createActions('VERIFY_SUBMIT')
const validateField = createAction('VERIFY_VALIDATE')

export default createReducer(
  {
    [changeField]: (state, payload) => ({
      ...state,
      verifyCode: payload,
      validateError: false,
      validateText: '',
    }),
    [submit.request]: state => ({ ...state, inProgress: true, error: false, errorText: null, success: false }),
    [submit.failure]: (state, payload) => ({
      ...state,
      inProgress: false,
      error: true,
      errorText: payload,
      success: false,
    }),
    [submit.success]: state => ({ ...state, inProgress: false, error: false, errorText: null, success: true }),
    [validateField]: (state, payload) => ({ ...state, validateError: true, validateText: payload }),
  },
  defaultState
)

export const actions = { changeField, submit, validateField }
