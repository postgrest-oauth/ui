import React, { Component } from 'react'
import { TextField, Button, CircularProgress, Typography, Checkbox, Link } from '@material-ui/core'
import MaskedInput from 'react-text-mask'
import { Redirect } from 'react-router-dom'
import withTranslation from '../../services/withTranslation'
import { emailIsValid } from '../../utils/emailRegex'

const TextMask = props => {
  const { inputRef, ...other } = props
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null)
      }}
      mask={['+', /\d/, /\d/, /\d/, ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
      placeholderChar={'\u2000'}
      placeholder="+123 (45) 678-90-12"
      guide={true}
      keepCharPositions={true}
    />
  )
}

class Signup extends Component {
  componentWillUnmount() {
    this.props.cleanup()
  }

  onSubmit = () => {
    const { t, email, password, submit, validateFields, pPolicyChecked } = this.props
    if (email.length < 1) {
      validateFields({ field: 'email', errorText: t('fieldRequired') })
    } else if (!emailIsValid(email)) {
      validateFields({ field: 'email', errorText: t('emailIncorrect') })
    } else if (password.length < 1) {
      validateFields({ field: 'password', errorText: t('fieldRequired') })
    } else {
      pPolicyChecked && submit()
    }
  }

  render() {
    const {
      t,
      email,
      password,
      phone,
      pPolicyChecked,
      error,
      errorText,
      inProgress,
      validate,
      changeField,
      toogleCheckbox,
      success,
    } = this.props
    return (
      <div className="card">
        <TextField
          label={t('emailInput')}
          variant="outlined"
          value={email}
          onChange={e => changeField({ field: 'email', value: e.target.value })}
          margin="normal"
          fullWidth={true}
          required={true}
          error={validate.field === 'email'}
          helperText={validate.field === 'email' && validate.errorText}
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
        <TextField
          label={t('phoneInput')}
          variant="outlined"
          value={phone}
          onChange={e => changeField({ field: 'phone', value: e.target.value })}
          margin="normal"
          fullWidth={true}
          InputProps={{
            inputComponent: TextMask,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          onKeyDown={e => e.keyCode === 13 && this.onSubmit()}
        />
        <div className="privacy-policy-link-container">
          <Checkbox checked={pPolicyChecked} onChange={toogleCheckbox} />
          <Typography color="textPrimary">{t('checkboxLabel')}</Typography>
          {'\u00A0'}
          <Link href={process.env.REACT_APP_PRIVACY_POLICY_URL}>{t('privacyPolicyLink')}</Link>
        </div>
        <div className="button-container">
          {inProgress ? (
            <CircularProgress size={40} />
          ) : (
            <Button variant="contained" color="primary" size="large" onClick={this.onSubmit} disabled={!pPolicyChecked}>
              {t('submitButton')}
            </Button>
          )}
        </div>
        {error && <Typography color="error">{errorText ? errorText : t('generalError')}</Typography>}
        {success && <Redirect to="/verify" />}
      </div>
    )
  }
}

export default withTranslation(Signup)
