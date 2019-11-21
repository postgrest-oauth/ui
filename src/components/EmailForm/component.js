import React, { Component } from 'react'
import { TextField, Button, CircularProgress, Typography } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import withTranslation from '../../services/withTranslation'

class EmailForm extends Component {
  async componentDidMount() {
    const { path, params } = this.props.match
    const { setVariant, changeField } = this.props
    path.includes('verify') ? await setVariant('verify') : await setVariant('password')
    if (!!params.username) {
      await changeField(params.username)
      this.onSubmit()
    }
  }

  onSubmit = () => {
    const { t, username, submit, validateFields } = this.props
    if (username.length < 1) {
      validateFields({ field: 'username', errorText: t('fieldRequired') })
    } else {
      submit()
    }
  }
  render() {
    const {
      t,
      username,
      error,
      inProgress,
      changeField,
      errorText,
      validateError,
      validateText,
      success,
      variant,
    } = this.props
    return (
      <div className="card">
        <TextField
          label={t('emailPhoneInput')}
          variant="outlined"
          value={username}
          onChange={e => changeField(e.target.value)}
          margin="normal"
          fullWidth={true}
          required={true}
          error={validateError}
          helperText={validateError && validateText}
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
        {error && <Typography color="error">{errorText ? errorText : t('generalError')}</Typography>}
        {success && <Redirect to={variant === 'verify' ? '/verify' : '/password/reset'} />}
      </div>
    )
  }
}

export default withTranslation(EmailForm)
