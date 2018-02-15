import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Authenticate } from 'components'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import { connect } from 'react-redux'

class AuthenticateContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    fetchAndHandleAuthedUser: PropTypes.func.isRequired,
  }
  handleAuth = () => {
    //TODO - AUTH
    console.log('here')
  }

  render () {
    const {isFetching, error} = this.props
    return (
      <Authenticate onAuth={this.handleAuth} isFetching={isFetching} error={error}/>
    )
  }
}

function mapStateToProps ({users}) {
  return {
    isFetching: users.get('isFetching'),
    error: users.get('error'),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {...userActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer)
