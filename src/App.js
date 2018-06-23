import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import { Card, Grid } from 'material-ui';
import PasswordRequest from './components/PasswordRequest';
import PasswordReset from './components/PasswordReset';
import Verify from './components/Verify';
import { MuiThemeProvider } from 'material-ui/styles';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.disableSpace = this.disableSpace.bind(this);
  }

  componentDidMount() {
    document.title = this.props.language.documentTitle;
  }

  disableSpace = (e) => {
    if ( e.keyCode === 32 ) {
      e.preventDefault();
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={this.props.theme}>
        <Grid container style={{paddingTop:"120px", justifyContent:"center"}}>
          <Router>
            <Card raised = {true} className="card">
              <Switch>
                <Route exact path="/signin" render={()=> <Login language={this.props.language} disableSpace={this.disableSpace} /> } />
                <Route path="/password/request" render={()=> <PasswordRequest language={this.props.language} disableSpace={this.disableSpace}/>} />
                <Route path="/password/reset" render={()=> <PasswordReset language={this.props.language} disableSpace={this.disableSpace}/>} />
                <Route path="/verify" render={()=> <Verify language={this.props.language} disableSpace={this.disableSpace}/>} />
              </Switch>
            </Card>
          </Router>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

