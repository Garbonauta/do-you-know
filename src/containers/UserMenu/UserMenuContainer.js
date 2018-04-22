import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import * as routeActionCreators from 'redux/modules/route'
import { UserMenu } from 'components'

class UserMenuContainer extends Component {
  static propTypes = {
    pictureUrl: PropTypes.string.isRequired,
    logOut: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
  }
  state = {
    actionOpen: false,
  }
  handleClick = e => {
    e.preventDefault()
    this.setState(prevState => {
      return {
        actionOpen: !prevState.actionOpen,
      }
    })
  }
  handleRequestClose = () => {
    this.setState({
      actionOpen: false,
    })
  }
  logOutAndRedirect = async e => {
    e.preventDefault()
    await this.props.logOut()
    this.props.changeRoute('/')
  }
  render() {
    const { pictureUrl } = this.props
    return (
      <UserMenu
        pictureUrl={pictureUrl}
        open={this.state.actionOpen}
        onClick={this.handleClick}
        handleClose={this.handleRequestClose}
        logout={this.logOutAndRedirect}
      />
    )
  }
}

function mapStateToProps({ users }) {
  const uid = users.get('uid')

  return {
    pictureUrl: uid
      ? users
          .get(uid)
          .get('info')
          .get('pictures')
          .get('small')
      : '',
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...routeActionCreators,
      ...userActionCreators,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenuContainer)
