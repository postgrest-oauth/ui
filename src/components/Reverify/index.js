import { connect } from 'react-redux'
import { actions } from './redux'
import Reverify from './component'

export default connect(
  state => ({
    username: state.reverify.username,
    error: state.reverify.error,
    errorText: state.reverify.errorText,
    inProgress: state.reverify.inProgress,
    validateError: state.reverify.validateError,
    validateText: state.reverify.validateText,
    success: state.reverify.success,
  }),
  {
    changeField: actions.changeField,
    submit: actions.submit.request,
    validateField: actions.validateField,
  }
)(Reverify)
