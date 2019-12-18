import React from 'react'
import { AppBar, Tabs, Tab } from '@material-ui/core'

import withTranslation from '../../services/withTranslation'
import Signin from '../Signin'
import Signup from '../Signup'

const Login = props => {
  const [value, setValue] = React.useState(0)
  const { t } = props

  const renderTabs = () => {
    if (process.env.REACT_APP_SIGNUP_ONLY) {
      return (
        <>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} variant="fullWidth" centered={true}>
              <Tab label={t('signUpTab')} />
            </Tabs>
          </AppBar>
          <Signup />
        </>
      )
    } else if (process.env.REACT_APP_SIGNIN_ONLY) {
      return (
        <>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} variant="fullWidth" centered={true}>
              <Tab label={t('signInTab')} />
            </Tabs>
          </AppBar>
          <Signin />
        </>
      )
    } else if (!process.env.REACT_APP_SIGNIN_ONLY && !process.env.REACT_APP_SIGNUP_ONLY) {
      return (
        <>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} variant="fullWidth" centered={true}>
              <Tab label={t('signInTab')} />
              <Tab label={t('signUpTab')} />
            </Tabs>
          </AppBar>
          {value === 0 && <Signin />}
          {value === 1 && <Signup />}
        </>
      )
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return <div>{renderTabs()}</div>
}

export default withTranslation(Login)
