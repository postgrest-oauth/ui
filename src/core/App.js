import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Router from './Router'
import queryString from 'query-string'
import { actions as settingsActions } from '../services/settingsReducer'
import { t } from '../utils/translate'

class App extends Component {
  componentDidMount() {
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
    document.title = t('documentTitle')
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <Router />
      </Provider>
    )
  }
}

export default App
