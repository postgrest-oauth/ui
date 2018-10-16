import React from 'react';
import { FormControl, InputLabel, Input, CircularProgress, Typography, Button } from 'material-ui';
import queryString from 'query-string';
import {InputMask} from './Signup';

const parsed = queryString.parse(window.location.search);

export default class Facebook extends React.Component {
  state = {
    uriState: '',
    fbError: false,
    phoneIsFull: false,
    phoneError: false,
    isLoading: false,
    phoneValue: "",
    isDisabled: () => { 
      if (this.state.phoneIsFull === false) {
        return true
      } else {
        return false
      }
    }
  }

  componentDidMount() {
    this.setState({ uriState: parsed.state })
    if (parsed.state === this.props.stateSignin) {
      const options = {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `lang=${this.props.language.languageValue}&redirect_uri=${window.location.origin}/callback/facebook?redirect_uri=${this.props.redirectUri}&code=${parsed.code}`
      }
      fetch(`${process.env.REACT_APP_OAUTH_URL}/facebook`, options)
        .then(response => {
          if (response.ok) {
            window.location.assign(`${process.env.REACT_APP_OAUTH_URL}/authorize?response_type=${this.props.responseType}&client_id=${this.props.clientId}&state=${this.props.state}&redirect_uri=${this.props.redirectUri}`);
          } else {
            this.setState({fbError: true})
          }
        })
    }
  }

  submitForm = () => {
    this.setState({ isLoading: true });
    let options = {
          method: "POST",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `lang=${this.props.language.languageValue}&phone=${this.state.phoneValue}&redirect_uri=${window.location.origin}/callback/facebook?redirect_uri=${this.props.redirectUri}&code=${parsed.code}`
        };
    fetch(`${process.env.REACT_APP_OAUTH_URL}/facebook`, options)
      .then((response)=> {
        if (response.ok) {
          window.location.assign(`${process.env.REACT_APP_OAUTH_URL}/authorize?response_type=${this.props.responseType}&client_id=${this.props.clientId}&state=${this.props.state}&redirect_uri=${this.props.redirectUri}`);
        } else {
          this.setState({ isLoading: false });
          this.setState({fbError: true})
        }
      });
  };

  handlePhoneError = (e) => {
    if ( e.target.value.length < 1 ) { this.setState({ phoneError: true }) }
  };

  changePhone = (e) => {
    this.setState({ phoneValue: e.target.value });
    if ( e.target.value.length > 18 ) {
      this.setState({ phoneIsFull: true })
      this.setState({ phoneError: false })
    } else {
      this.setState({ phoneIsFull: false })
    }
  };

  render() {
    return (
      <div className='form'>
        {checkState(
          this.state, 
          this.props, 
          this.state.uriState, 
          this.props.stateSignin, 
          this.props.stateSignup, 
          this.state.fbError,
          this.handlePhoneError,
          this.submitForm
        )}
      </div>
    )
  }
}

const checkState = (state, props, uriState, signin, signup, error, handlePhoneError, submitForm) => {
  if (uriState === signin && !error) {
    return <Typography color='primary' variant='title'>Пожалуйста подождите</Typography>
  } else if (uriState === signup && !error) {
    return (
      <div>
        <Typography color='primary'>Пожалуйста введите ваш номер телефона</Typography>
        <FormControl margin="normal" error={state.phoneError} fullWidth >
          <InputLabel shrink={true}> {props.language.phoneNumber} </InputLabel>
          <Input onChange={this.changePhone} onBlur={handlePhoneError} inputComponent={InputMask} />
        </FormControl>
        <Button
          variant="raised"
          color="primary"
          onClick={submitForm}
          disabled={state.isDisabled()}
          style={{ padding:"10px 30px", margin:"15px 0 10px 0" }}
        >
          {props.language.submitButton}
          {state.isLoading && <CircularProgress className="spinner" color="primary"/> }
        </Button>
      </div>
    )
  } else if (uriState !== signup || uriState !== signin || error) {
    return <Typography color='primary' variant='title'>Упс, ошибочка :(</Typography>
  }
}