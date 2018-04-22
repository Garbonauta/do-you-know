import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  CallbackContainer,
  GroupContainer,
  HomeContainer,
  LoginContainer,
  NavigationContainer,
} from 'containers'
import * as usersActionCreators from 'redux/modules/users'
import * as routeActionCreators from 'redux/modules/route'

const PrivateRoute = ({
  component: Component,
  isAuthed,
  isFetching,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (isFetching) {
        return null
      }

      const pathName = props.location.pathname
      if (pathName === '/' && isAuthed) {
        return <Redirect to="/home" />
      }
      return <Component {...props} />
    }}
  />
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
    changeRoute: PropTypes.func.isRequired,
    handleAuthedUserFromBrowserCache: PropTypes.func.isRequired,
  }
  async componentDidMount() {
    const pathname = window.location.pathname
    if (
      pathname &&
      pathname !== '/callback' &&
      localStorage.getItem('access_token')
    ) {
      try {
        await this.props.handleAuthedUserFromBrowserCache()
      } catch (error) {
        this.props.changeRoute('/')
      }
    }
  }

  render() {
    const { history, isAuthed, userFetching } = this.props

    return (
      <NavigationContainer isAuthed={isAuthed}>
        <ConnectedRouter history={history}>
          <Switch>
            <PrivateRoute
              exact={true}
              path="/"
              isAuthed={isAuthed}
              isFetching={userFetching}
              component={LoginContainer}
            />
            <PrivateRoute
              path="/home"
              isAuthed={isAuthed}
              isFetching={userFetching}
              component={HomeContainer}
            />
            <PrivateRoute
              path="/group/:groupId"
              isFetching={userFetching}
              isAuthed={isAuthed}
              component={GroupContainer}
            />
            <Route
              path="/callback"
              isAuthed={isAuthed}
              isFetching={userFetching}
              component={CallbackContainer}
            />
          </Switch>
        </ConnectedRouter>
      </NavigationContainer>
    )
  }
}

function mapStateToProps({ users, friends }, props) {
  return {
    history: props.history,
    isAuthed: users.get('isAuthed'),
    userFetching: users.get('isFetching'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...usersActionCreators,
      ...routeActionCreators,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
