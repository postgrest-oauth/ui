import React, { Component } from 'react'
import { TextField, Button, CircularProgress, Typography } from '@material-ui/core'
import withTranslation from '../../services/withTranslation'

class Verify extends Component {
  async componentDidMount() {
    const { code } = this.props.match.params
    if (!!code) {
      await this.props.changeField(code)
      this.onSubmit()
    }
  }

  onSubmit = () => {
    const { t, verifyCode, submit, validateField } = this.props
    verifyCode.length < 1 ? validateField(t('fieldRequired')) : submit()
  }

  renderButton = () => {
    const { t, success, redirect_uri } = this.props
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
    const {
      t,
      verifyCode,
      error,
      inProgress,
      changeField,
      errorText,
      validateError,
      validateText,
      success,
    } = this.props
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
            type="number"
          />
        )}
        <div className="button-container">{inProgress ? <CircularProgress size={40} /> : this.renderButton()}</div>
        {error && <Typography color="error">{errorText ? errorText : t('generalError')}</Typography>}
      </div>
    )
  }
}

export default withTranslation(Verify)
