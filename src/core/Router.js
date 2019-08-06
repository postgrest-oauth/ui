import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Container, Box } from '@material-ui/core'

import Login from '../components/Login'
import Verify from '../components/Verify'
import Reverify from '../components/Reverify'

const Router = () => (
  <div className="main-container">
    <Container maxWidth="xs">
      <Box boxShadow={1}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/verify/:code?" component={Verify} />
            <Route exact path="/re-verify" component={Reverify} />
            <Route exact path="/password/request" component={Reverify} />
          </Switch>
        </BrowserRouter>
      </Box>
    </Container>
  </div>
)

export default Router
