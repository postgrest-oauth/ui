import React from 'react';
import { FormControl, InputLabel, Input, CircularProgress, Typography, Button } from 'material-ui';
import queryString from 'query-string';
import {InputMask} from './Signup';

const parsed = queryString.parse(window.location.search);

export default class Facebook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fbState: '',
      fbError: false,
      phoneIsFull: false,
      phoneError: false,
      isLoading: false,
      phoneValue: null,
      responseType: '',
      clientId: '',
      uriState: '',
      redirectUri: null,
      isDisabled: () => { 
        if (this.state.phoneIsFull === false) {
          return true
        } else {
          return false
        }
      }
    }
    this.submitForm = this.submitForm.bind(this)
    this.handlePhoneError = this.handlePhoneError.bind(this)
    this.changePhone = this.changePhone.bind(this)
  }

  componentDidMount() {
    this.setState({ fbState: parsed.state })
    const params = {
      responseType: window.localStorage.getItem('responseType'),
      clientId: window.localStorage.getItem('clientId'),
      uriState: window.localStorage.getItem('uriState'),
      redirectUri: window.localStorage.getItem('redirectUri')
    }
    if (parsed.state === this.props.stateSignin && params.redirectUri) {
      const options = {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `lang=${this.props.language.languageValue}&phone=${this.state.phoneValue}&redirect_uri=${window.location.origin}/callback/facebook&code=${parsed.code}`
      }
      fetch(`${process.env.REACT_APP_OAUTH_URL}/facebook`, options)
        .then(response => {
          if (response.ok) {
            window.localStorage.clear();
            window.location.assign(`${process.env.REACT_APP_OAUTH_URL}/authorize?response_type=${params.responseType}&client_id=${params.clientId}&state=${params.uriState}&redirect_uri=${params.redirectUri}`);
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
          body: `lang=${this.props.language.languageValue}&phone=${this.state.phoneValue}&redirect_uri=${window.location.origin}/callback/facebook&code=${parsed.code}`
        };
    fetch(`${process.env.REACT_APP_OAUTH_URL}/facebook`, options)
      .then((response)=> {
        if (response.ok) {
          window.localStorage.clear();
          window.location.assign(`${process.env.REACT_APP_OAUTH_URL}/authorize?response_type=${this.state.responseType}&client_id=${this.state.clientId}&state=${this.state.uriState}&redirect_uri=${this.state.redirectUri}`);
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
      checkState(
        this.state, 
        this.props,
        this.props.stateSignin, 
        this.props.stateSignup,
        this.handlePhoneError,
        this.submitForm,
        this.changePhone
      )
    )
  }
}

const checkState = (state, props, signin, signup, handlePhoneError, submitForm, changePhone) => {
  if (state.fbState === signin && !state.error) {
    return (
      <div className='form'>
        <Typography color='primary' variant='title'>{props.language.fbWait}</Typography>
      </div>
    )
  } else if (state.fbState === signup && !state.error) {
    return (
      <div className='form'>
        <Typography color='primary'>{props.language.fbEnterPhone}</Typography>
        <FormControl margin="normal" error={state.phoneError} fullWidth >
          <InputLabel shrink={true}> {props.language.phoneNumber} </InputLabel>
          <Input onChange={changePhone} onBlur={handlePhoneError} inputComponent={InputMask} />
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
  } else if (state.fbState !== signup || state.fbState !== signin || state.error) {
    return (
      <div className='form'>
        <Typography color='primary' variant='title'>{props.language.fbError}</Typography>
      </div>
    )
  }
}