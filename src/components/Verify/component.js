import React, { Component } from 'react'
import { TextField, Button, CircularProgress, Typography } from '@material-ui/core'
import { t } from '../../utils/translate'

class Verify extends Component {
  componentDidMount() {
    const { code } = this.props.match.params
    !!code && this.props.changeField(code)
  }

  onSubmit = () => {
    const { verifyCode, submit, validateField } = this.props
    verifyCode.length < 1 ? validateField(t('fieldRequired')) : submit()
  }

  renderButton = () => {
    const { success, redirect_uri } = this.props
    if (!success) {
      return (
        <Button variant="contained" color="primary" size="large" onClick={this.onSubmit}>
          {t('submitButton')}
        </Button>
      )
    } else if (success && !!redirect_uri) {
      return (
        <Button variant="contained" color="primary" size="large" onClick={() => this.props.history.push('/')}>
          {t('nextButton')}
        </Button>
      )
    } else if (success && !redirect_uri) {
      return <Typography color="primary">{t('reloginMessage')}</Typography>
    }
  }

  render() {
    const { verifyCode, error, inProgress, changeField, errorText, validateError, validateText, success } = this.props
    return (
      <div className="card">
        <Typography color="primary">{!success ? t('verifyText') : t('verifySuccessMessage')}</Typography>
        {!success && (
          <TextField
            label={t('verifyInput')}
            variant="outlined"
            value={verifyCode}
            onChange={e => changeField(e.target.value)}
            margin="normal"
            fullWidth={true}
            required={true}
            error={validateError}
            helperText={validateError && validateText}
            onKeyDown={e => e.keyCode === 13 && this.onSubmit()}
          />
        )}
        <div className="button-container">{inProgress ? <CircularProgress size={40} /> : this.renderButton()}</div>
        {error && <Typography color="error">{errorText}</Typography>}
      </div>
    )
  }
}

export default Verify
