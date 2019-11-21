import { createAction, createReducer } from 'redux-act'
import { createActions } from '../../utils/redux'

const defaultState = {
  inProgress: false,
  error: false,
  errorText: null,
  email: '',
  password: '',
  phone: '',
  pPolicyChecked: false,
  validate: {
    field: null,
    errorText: null,
  },
  success: false,
}

const changeField = createAction('SIGNUP_CHANGE_FIELD')
const toogleCheckbox = createAction('SIGNUP_TOOGLE_CHECKBOX')
const submit = createActions('SIGNUP_SUBMIT')
const validateFields = createAction('SIGNUP_VALIDATE')
const cleanup = createAction('SIGNUP_CLEANUP')

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
    [toogleCheckbox]: state => ({ ...state, pPolicyChecked: !state.pPolicyChecked }),
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
    [cleanup]: () => defaultState,
  },
  defaultState
)

export const actions = { changeField, toogleCheckbox, submit, validateFields, cleanup }
