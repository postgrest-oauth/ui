import { connect } from 'react-redux'
import { actions } from './redux'
import Signin from './component'

export default connect(
  state => ({
    username: state.signin.username,
    password: state.signin.password,
    error: state.signin.error,
    errorText: state.signin.errorText,
    validate: state.signin.validate,
    inProgress: state.signin.inProgress,
    success: state.signin.success,
  }),
  {
    changeField: actions.changeField,
    submit: actions.submit.request,
    validateFields: actions.validateFields,
    cleanup: actions.cleanup,
  }
)(Signin)
