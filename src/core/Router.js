import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Container, Box } from '@material-ui/core'
import { env } from '../static/muiTheme'

import Login from '../components/Login'
import Verify from '../components/Verify'
import EmailForm from '../components/EmailForm'
import ResetPassword from '../components/ResetPassword'
import NotFound from '../components/NotFound'

const Router = () => (
  <div className="main-container">
    <Container maxWidth="sm" style={{ backgroundColor: process.env.REACT_APP_USE_DARK ? '#333333' : '#fff' }}>
      <Box boxShadow={env.type === 'light' ? 1 : 0}>
        <BrowserRouter>
          <Switch>
            <Route exact path={['/', '/signin', '/signup']} component={Login} />
            <Route exact path="/verify/:code?" component={Verify} />
            <Route exact path="/re-verify/:username?" component={EmailForm} />
            <Route exact path="/password/request/:username?" component={EmailForm} />
            <Route exact path="/password/reset/:code?" component={ResetPassword} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Box>
    </Container>
  </div>
)

export default Router
