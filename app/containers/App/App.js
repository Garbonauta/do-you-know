import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoginContainer, CallbackContainer } from 'containers'
import { ContentContainer } from './Styles'

class App extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  render () {
    const {history} = this.props

    return (
      <ConnectedRouter history={history}>
        <ContentContainer>
          <Switch>
            <Route
              exact={true}
              path='/'
              component={LoginContainer}/>
            <Route
              path='/callback'
              component={CallbackContainer}/>
          </Switch>
        </ContentContainer>
      </ConnectedRouter>
    )
  }
}

export default connect()(App)
