import { connect } from 'react-redux'
import { actions } from './redux'
import ResetPassword from './component'

export default connect(
  state => ({
    code: state.resetPassword.code,
    password: state.resetPassword.password,
    error: state.resetPassword.error,
    errorText: state.resetPassword.errorText,
    validate: state.resetPassword.validate,
    inProgress: state.resetPassword.inProgress,
    success: state.resetPassword.success,
    redirect_uri: state.settings.redirect_uri,
  }),
  {
    changeField: actions.changeField,
    submit: actions.submit.request,
    validateFields: actions.validateFields,
  }
)(ResetPassword)
