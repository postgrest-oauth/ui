import { connect } from 'react-redux'
import { actions } from './redux'
import Signup from './component'

export default connect(
  state => ({
    email: state.signup.email,
    password: state.signup.password,
    phone: state.signup.phone,
    pPolicyChecked: state.signup.pPolicyChecked,
    error: state.signup.error,
    errorText: state.signup.errorText,
    inProgress: state.signup.inProgress,
    validate: state.signup.validate,
    success: state.signup.success,
  }),
  {
    changeField: actions.changeField,
    toogleCheckbox: actions.toogleCheckbox,
    submit: actions.submit.request,
    validateFields: actions.validateFields,
    cleanup: actions.cleanup,
  }
)(Signup)
