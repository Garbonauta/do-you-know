import React from 'react'
import ReactDOM from 'react-dom'
import 'intersection-observer'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, intlReducer } from 'react-intl-redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { addLocaleData } from 'react-intl'
import es from 'react-intl/locale-data/es'
import thunk from 'redux-thunk'
import * as reducers from 'redux/modules'
import { App } from 'containers'
import messages from 'data/messages/es'
import { MuiThemeProvider } from 'material-ui/styles'
import theme from 'sharedStyles/theme'

function loadPolyfills() {
  const polyfills = []

  if (!supportsIntersectionObserver()) {
    polyfills.push(import('intersection-observer'))
  }

  return Promise.all(polyfills)
}

function supportsIntersectionObserver() {
  return (
    'IntersectionObserver' in global &&
    'IntersectionObserverEntry' in global &&
    'intersectionRatio' in IntersectionObserverEntry.prototype
  )
}

const composeEnhancers = composeWithDevTools({})

const history = createBrowserHistory()

addLocaleData([...es])
const initialState = {
  intl: {
    locale: 'es',
    messages,
  },
}

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer,
    intl: intlReducer,
  }),
  initialState,
  composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
)
loadPolyfills().then(
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <App history={history} />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')
  )
)
