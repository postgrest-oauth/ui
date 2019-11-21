import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Router from './Router'
import queryString from 'query-string'
import { ThemeProvider } from '@material-ui/styles'
import { actions as settingsActions } from '../services/settingsReducer'
import withTranslation from '../services/withTranslation'
import { theme } from '../static/muiTheme'

class App extends Component {
  componentDidMount() {
    document.body.style.backgroundColor = process.env.REACT_APP_USE_DARK ? '#212121' : '#fff'
    const params = queryString.parse(window.location.search)
    const { search } = window.location
    const { store } = this.props
    Object.keys(params).length !== 0 &&
      store.dispatch(
        settingsActions.setParams({
          redirect_uri: params.redirect_uri,
          search: search,
        })
      )
    document.title = this.props.t('documentTitle')
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </Provider>
    )
  }
}

export default withTranslation(App)
