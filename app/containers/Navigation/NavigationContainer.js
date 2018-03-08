import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Navigation } from 'components'
import * as userActionCreators from 'redux/modules/users'
import * as routeActionCreators from 'redux/modules/route'

class NavigationContainer extends Component {
  static propTypes = {
    messages: PropTypes.object.isRequired,
    pictureUrl: PropTypes.string.isRequired,
    drawerToggle: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
  }
  state = {
    actionOpen: false,
    anchorE1: null,
  }
  handleAvatarClick = (e) => {
    e.preventDefault()
    this.setState({
      actionOpen: true,
      anchorE1: e.currentTarget,
    })
  }
  handleAvatarRequestClose = () => {
    this.setState({
      actionOpen: false,
    })
  }
  logOutAndRedirect = async (e) => {
    e.preventDefault()
    await this.props.logOut()
    this.props.changeRoute('/')
  }
  render () {
    const { messages, pictureUrl, drawerToggle } = this.props

    return (
      <Navigation
        messages={messages}
        pictureUrl={pictureUrl}
        iconAction={drawerToggle}
        avatarOpen={this.state.actionOpen}
        avatarAnchor={this.state.anchorE1}
        avatarClick={this.handleAvatarClick}
        avatarRequestClose={this.handleAvatarRequestClose}
        logout={this.logOutAndRedirect}/>
    )
  }
}

function mapStateToProps ({users, intl: {messages}}) {
  const uid = users.get('uid')

  return {
    pictureUrl: uid ? users.get(uid).get('info').get('details').get('picture') : '',
    messages: {
      appName: messages.appName,
    },
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      ...userActionCreators,
      ...routeActionCreators,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationContainer)
