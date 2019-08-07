import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Container, Box } from '@material-ui/core'

import Login from '../components/Login'
import Verify from '../components/Verify'
import EmailForm from '../components/EmailForm'
import ResetPassword from '../components/ResetPassword'
import NotFound from '../components/NotFound'

const Router = () => (
  <div className="main-container">
    <Container maxWidth="xs">
      <Box boxShadow={1}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/verify/:code?" component={Verify} />
            <Route path="/re-verify/:username?" component={EmailForm} />
            <Route path="/password/request/:username?" component={EmailForm} />
            <Route path="/password/reset/:code?" component={ResetPassword} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Box>
    </Container>
  </div>
)

export default Router
