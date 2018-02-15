import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {ConnectedRouter} from 'react-router-redux'
import {Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {AuthenticateContainer} from 'containers'
import { ContentContainer } from './Styles'

class App extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  loadFbLoginApi () {
    window.fbAsyncInit = function () {
      FB.init({
        appId: process.env.FACEBOOK_API_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.12',
      })
    };

    (function (d, s, id) {
      let js
      const fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
  }

  componentDidMount = () => {
    this.loadFbLoginApi()
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
              component={AuthenticateContainer}/>
          </Switch>
        </ContentContainer>
      </ConnectedRouter>
    )
  }
}

export default connect()(App)
