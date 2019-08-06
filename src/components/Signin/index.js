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
  }),
  {
    changeField: actions.changeField,
    submit: actions.submit.request,
    validateFields: actions.validateFields,
    cleanup: actions.cleanup,
  }
)(Signin)
