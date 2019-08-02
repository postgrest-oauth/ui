import React from 'react'
import { AppBar, Tabs, Tab } from '@material-ui/core'

import { t } from '../../utils/translate'
import Signin from '../Signin'
import Signup from '../Signup'

const Login = () => {
  const [value, setValue] = React.useState(0)

  function handleChange(event, newValue) {
    setValue(newValue)
  }

  return (
    <div>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label={t('signInTab')} />
          <Tab label={t('signUpTab')} />
        </Tabs>
      </AppBar>
      {value === 0 && <Signin />}
      {value === 1 && <Signup />}
    </div>
  )
}

export default Login
