import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import { Card, Grid } from 'material-ui';
import PasswordRequest from './components/PasswordRequest';
import PasswordReset from './components/PasswordReset';
import Verify from './components/Verify';

export default class App extends Component {
  render() {
    return (
      <Grid container style={{paddingTop:"120px", justifyContent:"center"}}>
        <Router>
          <Card raised = {true} style = {{ width: "420px", padding: "20px 50px" }}>
            <Switch>
              <Route exact path="/signin" render={()=> <Login language={this.props.language} /> } />
              <Route path="/password/request" render={()=> <PasswordRequest language={this.props.language} />} />
              <Route path="/password/reset" render={()=> <PasswordReset language={this.props.language} />} />
              <Route path="/verify" render={()=> <Verify language={this.props.language} />} />
            </Switch>
          </Card>
        </Router>
      </Grid>
    );
  }
}

