import { createAction, createReducer } from 'redux-act'
import { createActions } from '../../utils/redux'

const defaultState = {
  inProgress: false,
  error: false,
  errorText: null,
  code: '',
  password: '',
  validate: {
    field: null,
    errorText: null,
  },
  success: false,
}

const changeField = createAction('RESET_PASSWORD_CHANGE_FIELD')
const submit = createActions('RESET_PASSWORD_SUBMIT')
const validateFields = createAction('RESET_PASSWORD_VALIDATE')

export default createReducer(
  {
    [changeField]: (state, payload) => ({
      ...state,
      [payload.field]: payload.value,
      validate: {
        field: null,
        errorText: null,
      },
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
    [validateFields]: (state, payload) => ({ ...state, validate: payload }),
  },
  defaultState
)

export const actions = { changeField, submit, validateFields }
