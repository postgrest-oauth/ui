import React, { Component } from 'react'
import { TextField, Button, CircularProgress, Typography } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { t } from '../../utils/translate'

class Reverify extends Component {
  componentDidMount() {
    console.log(this.props)
  }

  onSubmit = () => {
    const { username, submit, validateFields } = this.props
    if (username.length < 1) {
      validateFields({ field: 'username', errorText: t('fieldRequired') })
    } else {
      submit()
    }
  }
  render() {
    const { username, error, inProgress, changeField, errorText, validateError, validateText, success } = this.props
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
        {error && (
          <Typography color="error" style={{ textTransform: 'capitalize' }}>
            {errorText}
          </Typography>
        )}
        {success && <Redirect to="/verify" />}
      </div>
    )
  }
}

export default Reverify
