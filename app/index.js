import React from 'react'
import ReactDOM from 'react-dom'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import * as reducers from 'redux/modules'
import {App} from 'containers'

const composeEnhancers = composeWithDevTools({})

const history = createBrowserHistory()

const store = createStore(
  combineReducers(
    { ...reducers,
      routing: routerReducer,
    }
  ),
  composeEnhancers(
    applyMiddleware(thunk, routerMiddleware(history))
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('app')
)
