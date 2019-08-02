import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

import Login from '../components/Login'
import Verify from '../components/Verify'

const Router = () => (
  <div className="main-container">
    <Container maxWidth="xs">
      <Box boxShadow={1}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/verify/:code?" component={Verify} />
          </Switch>
        </BrowserRouter>
      </Box>
    </Container>
  </div>
)

export default Router
