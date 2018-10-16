import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui';
import Signin from './Signin';
import Signup from './Signup';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: this.props.language,
      value: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div>
        <Tabs value={this.state.value} onChange={this.handleChange} textColor="primary" fullWidth={true}>
          <Tab label={this.state.lng.signIn} value={0}/>
          <Tab label={this.state.lng.signUp} value={1}/>
        </Tabs>
        {this.state.value === 0 && <Signin language={this.props.language} stateSignin={this.props.stateSignin} redirectUri={this.props.redirectUri}/>}
        {this.state.value === 1 && <Signup language={this.props.language} stateSignup={this.props.stateSignup} redirectUri={this.props.redirectUri}/>}
      </div>
    );
  }
};
