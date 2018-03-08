import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavDrawer } from 'components'
import { LoginContainer, CallbackContainer, HomeContainer, NavigationContainer } from 'containers'
import * as usersActionCreators from 'redux/modules/users'
import * as routeActionCreators from 'redux/modules/route'
import { ContentContainer } from './Styles'

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
    isFetching: PropTypes.bool.isRequired,
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
    if (pathname && (pathname !== '/callback')) {
      try {
        await this.props.handleAuthedUserFromBrowserCache()
      } catch (error) {
        this.props.changeRoute('/')
      }
    }
  }
  handleDrawerToggle = () => this.setState({drawerOpen: !this.state.drawerOpen})

  render () {
    const {history, isAuthed, isFetching} = this.props

    return (
      <ConnectedRouter history={history}>
        <div>
          {isAuthed && <NavigationContainer drawerToggle={this.handleDrawerToggle} />}
          {isAuthed && <NavDrawer open={this.state.drawerOpen} />}
          <ContentContainer>
            <Switch>
              <PrivateRoute
                exact={true}
                path='/'
                isAuthed={isAuthed}
                isFetching={isFetching}
                component={LoginContainer}/>
              <PrivateRoute
                path='/home'
                isAuthed={isAuthed}
                isFetching={isFetching}
                component={HomeContainer}/>
              <Route
                path='/callback'
                isAuthed={isAuthed}
                isFetching={isFetching}
                component={CallbackContainer}/>
            </Switch>
          </ContentContainer>
        </div>
      </ConnectedRouter>
    )
  }
}

function mapStateToProps ({users, friends}, props) {
  return {
    history: props.history,
    isAuthed: users.get('isAuthed'),
    isFetching: users.get('isFetching'),
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
