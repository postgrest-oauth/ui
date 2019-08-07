import { connect } from 'react-redux'
import { actions } from './redux'
import EmailForm from './component'

export default connect(
  state => ({
    username: state.emailForm.username,
    error: state.emailForm.error,
    errorText: state.emailForm.errorText,
    inProgress: state.emailForm.inProgress,
    validateError: state.emailForm.validateError,
    validateText: state.emailForm.validateText,
    success: state.emailForm.success,
    variant: state.emailForm.variant,
  }),
  {
    changeField: actions.changeField,
    submit: actions.submit.request,
    validateField: actions.validateField,
    setVariant: actions.setVariant,
  }
)(EmailForm)
