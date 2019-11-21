import { createAction, createReducer } from 'redux-act'
import { createActions } from '../../utils/redux'

const defaultState = {
  inProgress: false,
  error: false,
  errorText: null,
  username: '',
  validateError: false,
  validateText: '',
  success: false,
  variant: null, // variant must be 'verify' or 'password'
}

const changeField = createAction('EMAILFORM_CHANGE_FIELD')
const submit = createActions('EMAILFORM_SUBMIT')
const validateField = createAction('EMAILFORM_VALIDATE')
const setVariant = createAction('EMAILFORM_SET_VARIANT')

export default createReducer(
  {
    [changeField]: (state, payload) => ({
      ...state,
      username: payload,
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
    [setVariant]: (state, payload) => ({ ...state, variant: payload }),
  },
  defaultState
)

export const actions = { changeField, submit, validateField, setVariant }
