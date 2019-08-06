import { connect } from 'react-redux'
import { actions } from './redux'
import Verify from './component'

export default connect(
  state => ({
    verifyCode: state.verify.verifyCode,
    error: state.verify.error,
    errorText: state.verify.errorText,
    inProgress: state.verify.inProgress,
    validateError: state.verify.validateError,
    validateText: state.verify.validateText,
    success: state.verify.success,
    redirect_uri: state.settings.redirect_uri,
  }),
  {
    changeField: actions.changeField,
    submit: actions.submit.request,
    validateField: actions.validateField,
  }
)(Verify)
