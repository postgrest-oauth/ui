import React from 'react'
import ReactDOM from 'react-dom'
import createSagaMiddleware from 'redux-saga'
import { applyMiddleware, compose, createStore } from 'redux'
import './index.css'
import * as serviceWorker from './serviceWorker'

import rootReducer from './core/rootReducer'
import rootSaga from './core/rootSaga'
import App from './core/App'

const sagaMW = createSagaMiddleware()
const initialState = {}
const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose
    : compose
export const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...[sagaMW])))
sagaMW.run(rootSaga)

ReactDOM.render(<App store={store} />, document.getElementById('root'))

serviceWorker.unregister()
