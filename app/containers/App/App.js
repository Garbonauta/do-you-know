import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { LoginContainer, CallbackContainer, HomeContainer } from 'containers'
import * as usersActionCreators from 'redux/modules/users'
import * as routeActionCreators from 'redux/modules/route'
import { ContentContainer } from './Styles'

class App extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    invalidAuth: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
    handleAuthedUserFromBrowserCache: PropTypes.func.isRequired,
  }
  async componentDidMount () {
    const pathname = window.location.pathname
    if (pathname && (pathname !== '/callback')) {
      try {
        await this.props.handleAuthedUserFromBrowserCache()
      } catch (error) {
        this.props.changeRoute('/')
      }
    }
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
            <Route
              path='/home'
              component={HomeContainer}/>
          </Switch>
        </ContentContainer>
      </ConnectedRouter>
    )
  }
}

function mapStateToProps () {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      ...usersActionCreators,
      ...routeActionCreators,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
