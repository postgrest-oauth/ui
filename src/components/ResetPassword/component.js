import React, { Component } from 'react'
import { TextField, Button, CircularProgress, Typography } from '@material-ui/core'
import withTranslation from '../../services/withTranslation'

class ResetPassword extends Component {
  componentDidMount() {
    const { code } = this.props.match.params
    !!code && this.props.changeField({ field: 'code', value: code })
  }

  onSubmit = () => {
    const { t, code, password, submit, validateFields } = this.props
    if (code.length < 1) {
      validateFields({ field: 'code', errorText: t('fieldRequired') })
    } else if (password.length < 1) {
      validateFields({ field: 'password', errorText: t('fieldRequired') })
    } else {
      submit()
    }
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
    const { t, code, password, error, inProgress, changeField, errorText, validate, success } = this.props
    return (
      <div className="card">
        <Typography color="primary">{!success ? t('verifyText') : t('passwordSuccessMessage')}</Typography>
        {!success && (
          <React.Fragment>
            <TextField
              label={t('verifyInput')}
              variant="outlined"
              value={code}
              onChange={e => changeField({ field: 'code', value: e.target.value })}
              margin="normal"
              fullWidth={true}
              required={true}
              error={validate.field === 'code'}
              helperText={validate.field === 'code' && validate.errorText}
              onKeyDown={e => e.keyCode === 13 && this.onSubmit()}
              type="number"
            />
            <TextField
              label={t('newPasswordInput')}
              variant="outlined"
              value={password}
              onChange={e => changeField({ field: 'password', value: e.target.value })}
              margin="normal"
              fullWidth={true}
              type="password"
              required={true}
              error={validate.field === 'password'}
              helperText={validate.field === 'password' && validate.errorText}
              onKeyDown={e => e.keyCode === 13 && this.onSubmit()}
            />
          </React.Fragment>
        )}
        <div className="button-container">{inProgress ? <CircularProgress size={40} /> : this.renderButton()}</div>
        {error && <Typography color="error">{errorText ? errorText : t('generalError')}</Typography>}
      </div>
    )
  }
}

export default withTranslation(ResetPassword)
