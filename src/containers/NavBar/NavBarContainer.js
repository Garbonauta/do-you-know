import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as routeActionCreators from 'redux/modules/route'
import { NavBar } from 'components'

class NavBarContainer extends Component {
  static propTypes = {
    messages: PropTypes.object.isRequired,
    drawerToggle: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
  }
  handleHome = e => {
    e.preventDefault()
    this.props.changeRoute('/home')
  }
  render() {
    const { messages, drawerToggle, isAuthed } = this.props

    return (
      <NavBar
        messages={messages}
        iconAction={drawerToggle}
        handleHome={this.handleHome}
      />
    )
  }
}

function mapStateToProps({ users, intl: { messages } }) {
  return {
    messages: {
      appName: messages.appName,
    },
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...routeActionCreators,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarContainer)
