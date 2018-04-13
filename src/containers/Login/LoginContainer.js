import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActionCreators from 'redux/modules/users'
import { Login } from 'components'

class LoginContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    loginUser: PropTypes.func.isRequired,
  }

  handleAuth = () => {
    this.props.loginUser()
  }

  render() {
    const { isFetching, error } = this.props
    return (
      <Login onAuth={this.handleAuth} isFetching={isFetching} error={error} />
    )
  }
}

function mapStateToProps({ users }) {
  return {
    isFetching: users.get('isFetching'),
    error: users.get('error'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...userActionCreators,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
