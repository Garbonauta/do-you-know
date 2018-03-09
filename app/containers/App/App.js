import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { LoginContainer, CallbackContainer, HomeContainer, NavigationContainer, NavDrawerContainer } from 'containers'
import * as usersActionCreators from 'redux/modules/users'
import * as routeActionCreators from 'redux/modules/route'
import { AllContent, ContentContainer, FlexContent } from './Styles'
import { Global } from 'sharedStyles'

const PrivateRoute = ({component: Component, isAuthed, isFetching, ...rest}) => (
  <Route {...rest} render={props => {
    if (isFetching) {
      return null
    }

    const pathName = props.location.pathname
    if (pathName === '/' && isAuthed) {
      return <Redirect to='/home' />
    }
    return <Component {...props}/>
  }}/>
)
PrivateRoute.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  location: PropTypes.object,
  component: PropTypes.func.isRequired,
}

class App extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    userFetching: PropTypes.bool.isRequired,
    isAuthed: PropTypes.bool.isRequired,
    invalidAuth: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
    handleAuthedUserFromBrowserCache: PropTypes.func.isRequired,
  }
  state = {
    drawerOpen: true,
  }
  async componentDidMount () {
    const pathname = window.location.pathname
    if (pathname && (pathname !== '/callback') && localStorage.getItem('access_token')) {
      try {
        await this.props.handleAuthedUserFromBrowserCache()
      } catch (error) {
        this.props.changeRoute('/')
      }
    }
  }
  handleDrawerToggle = () => this.setState({drawerOpen: !this.state.drawerOpen})

  render () {
    const {history, isAuthed, userFetching} = this.props

    return (
      <ConnectedRouter history={history}>
        <AllContent>
          {isAuthed && <NavigationContainer drawerToggle={this.handleDrawerToggle} />}
          <FlexContent>
            {isAuthed && <NavDrawerContainer open={this.state.drawerOpen} />}
            <ContentContainer open={this.state.drawerOpen}>
              <Switch>
                <PrivateRoute
                  exact={true}
                  path='/'
                  isAuthed={isAuthed}
                  isFetching={userFetching}
                  component={LoginContainer}/>
                <PrivateRoute
                  path='/home'
                  isAuthed={isAuthed}
                  isFetching={userFetching}
                  component={HomeContainer}/>
                <Route
                  path='/callback'
                  isAuthed={isAuthed}
                  isFetching={userFetching}
                  component={CallbackContainer}/>
              </Switch>
            </ContentContainer>
          </FlexContent>
        </AllContent>
      </ConnectedRouter>
    )
  }
}

function mapStateToProps ({users, friends}, props) {
  return {
    history: props.history,
    isAuthed: users.get('isAuthed'),
    userFetching: users.get('isFetching'),
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
