import React, { Component } from 'react'
import { TextField, Button, CircularProgress, Link, Typography } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import { t } from '../../utils/translate'

class Signin extends Component {
  componentWillUnmount() {
    this.props.cleanup()
  }

  onSubmit = () => {
    const { username, password, submit, validateFields } = this.props
    if (username.length < 1) {
      validateFields({ field: 'username', errorText: t('fieldRequired') })
    } else if (password.length < 1) {
      validateFields({ field: 'password', errorText: t('fieldRequired') })
    } else {
      submit()
    }
  }

  render() {
    const { username, password, error, inProgress, changeField, errorText, validate } = this.props
    return (
      <div className="card">
        <TextField
          label={t('emailPhoneInput')}
          variant="outlined"
          value={username}
          onChange={e => changeField({ field: 'username', value: e.target.value })}
          margin="normal"
          fullWidth={true}
          required={true}
          error={validate.field === 'username'}
          helperText={validate.field === 'username' && validate.errorText}
          onKeyDown={e => e.keyCode === 13 && this.onSubmit()}
        />
        <TextField
          label={t('passwordInput')}
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
        <div className="button-container">
          {inProgress ? (
            <CircularProgress size={40} />
          ) : (
            <Button variant="contained" color="primary" size="large" onClick={this.onSubmit}>
              {t('submitButton')}
            </Button>
          )}
        </div>
        {error && (
          <Typography color="error" style={{ textTransform: 'capitalize' }}>
            {errorText}
          </Typography>
        )}
        <Link component={RouterLink} to="/">
          {t('passwordResetLink')}
        </Link>
        <Link component={RouterLink} to="/">
          {t('reVerifyLink')}
        </Link>
      </div>
    )
  }
}

export default Signin
