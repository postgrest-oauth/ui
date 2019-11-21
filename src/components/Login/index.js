import React from 'react'
import { AppBar, Tabs, Tab } from '@material-ui/core'

import withTranslation from '../../services/withTranslation'
import Signin from '../Signin'
import Signup from '../Signup'

const Login = props => {
  const [value, setValue] = React.useState(0)

  function handleChange(event, newValue) {
    setValue(newValue)
  }
  const { t } = props
  return (
    <div>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} variant="fullWidth" centered={true}>
          <Tab label={t('signInTab')} />
          <Tab label={t('signUpTab')} />
        </Tabs>
      </AppBar>
      {value === 0 && <Signin />}
      {value === 1 && <Signup />}
    </div>
  )
}

export default withTranslation(Login)
