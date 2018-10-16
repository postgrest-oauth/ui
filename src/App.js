import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Card } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import queryString from 'query-string';

import Login from './components/Login';
import PasswordRequest from './components/PasswordRequest';
import PasswordReset from './components/PasswordReset';
import Verify from './components/Verify';
import VerifySuccess from './components/VerifySuccess';
import PasswordSuccess from './components/PasswordSuccess';
import ReVerify from './components/ReVerify';
import Facebook from './components/Facebok';


const parsed = queryString.parse(window.location.search);

export default class App extends Component {
  state = {
    stateSignin: 'signin',
    stateSignup: 'signup',
    redirectUri: encodeURIComponent(parsed.redirect_uri),
    responseType: parsed.response_type,
    clientId: parsed.clientId,
    state: parsed.state
  }

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
                <Route 
                  exact path="/signin" 
                  render={()=> (
                    <Login 
                      language={this.props.language} 
                      stateSignin={this.state.stateSignin} 
                      stateSignup={this.state.stateSignup} 
                      redirectUri={this.state.redirectUri}
                      responseType={this.state.responseType}
                      clientId={this.state.clientId}
                      state={this.state.state}
                    />
                  )} 
                />
                <Route path="/password/request/:username?" render={({match})=> <PasswordRequest language={this.props.language} match={match}/>} />
                <Route path="/password/reset/:code?" render={({match})=> <PasswordReset language={this.props.language} match={match}/>} />
                <Route path="/verify/:code?" render={({match}) => <Verify language={this.props.language} match={match}/>} />
                <Route path="/re-verify/:username?" render={({match})=> <ReVerify language={this.props.language} match={match}/>} />
                <Route path="/success" render={()=> <VerifySuccess language={this.props.language} uri={this.props.uri} />} />
                <Route path="/password/success" render={()=> <PasswordSuccess language={this.props.language} uri={this.props.uri} />} />
                <Route 
                  path="/callback/facebook" 
                  render={()=> (
                    <Facebook 
                      language={this.props.language} 
                      stateSignin={this.state.stateSignin} 
                      stateSignup={this.state.stateSignup} 
                      redirectUri={this.state.redirectUri}
                      responseType={this.state.responseType}
                      clientId={this.state.clientId}
                      state={this.state.state}
                    />
                  )}
                />
              </Switch>
            </Card>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

