import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import { Card } from 'material-ui';
import PasswordRequest from './components/PasswordRequest';
import PasswordReset from './components/PasswordReset';
import Verify from './components/Verify';
import Success from './components/Success';
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
                <Route path="/success" render={()=> <Success language={this.props.language} />} />
              </Switch>
            </Card>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

