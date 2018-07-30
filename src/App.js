import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import { Card } from 'material-ui';
import PasswordRequest from './components/PasswordRequest';
import PasswordReset from './components/PasswordReset';
import Verify from './components/Verify';
import VerifySuccess from './components/VerifySuccess';
import PasswordSuccess from './components/PasswordSuccess';
import { MuiThemeProvider } from 'material-ui/styles';

export default class App extends Component {
  componentDidMount() {
    document.title = this.props.language.documentTitle;
  }

  render() {
    return (
      <MuiThemeProvider theme={this.props.theme}>
        <div className='flex-container'>
          <Router>
            <Card raised = {true} className="card">
              <Switch>
                <Route exact path="/signin" render={()=> <Login language={this.props.language} /> } />
                <Route path="/password/request" render={()=> <PasswordRequest language={this.props.language} />} />
                <Route path="/password/reset" render={()=> <PasswordReset language={this.props.language} />} />
                <Route path="/verify" render={()=> <Verify language={this.props.language} />} />
                <Route path="/success" render={()=> <VerifySuccess language={this.props.language} uri={this.props.uri} />} />
                <Route path="/password/success" render={()=> <PasswordSuccess language={this.props.language} uri={this.props.uri} />} />
              </Switch>
            </Card>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

