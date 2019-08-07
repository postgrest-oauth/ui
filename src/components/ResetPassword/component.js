import React, { Component } from 'react'
import { TextField, Button, CircularProgress, Typography } from '@material-ui/core'
import { t } from '../../utils/translate'

class ResetPassword extends Component {
  componentDidMount() {
    const { code } = this.props.match.params
    !!code && this.props.changeField({ field: 'code', value: code })
  }

  onSubmit = () => {
    const { code, password, submit, validateFields } = this.props
    if (code.length < 1) {
      validateFields({ field: 'code', errorText: t('fieldRequired') })
    } else if (password.length < 1) {
      validateFields({ field: 'password', errorText: t('fieldRequired') })
    } else {
      submit()
    }
  }

  render() {
    const { code, password, error, inProgress, changeField, errorText, validate, success } = this.props
    return (
      <div className="card">
        <Typography color="primary">{t('verifyText')}</Typography>
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
      </div>
    )
  }
}

export default ResetPassword
