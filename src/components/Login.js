import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui';
import Signin from './Signin';
import Signup from './Signup';

const json = require('../language.json'),
      lng = json.language;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        <Tabs value={this.state.value} onChange={this.handleChange} indicatorColor="primary" textColor="primary">
          <Tab label={lng.signIn} value={0}/>
          <Tab label={lng.signUp} value={1}/>
        </Tabs>
        {this.state.value === 0 && <Signin/>}
        {this.state.value === 1 && <Signup/>}
       </div>
    );
  }
};