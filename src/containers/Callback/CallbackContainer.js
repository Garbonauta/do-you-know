import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActionCreators from 'redux/modules/users'
import * as routeActionCreators from 'redux/modules/route'
import { Callback } from 'components'

class CallbackContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    messages: PropTypes.object.isRequired,
    fetchAndHandleAuthedUser: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
  }

  async componentDidMount() {
    try {
      await this.props.fetchAndHandleAuthedUser()
      this.props.changeRoute('/home')
    } catch (error) {
      this.props.changeRoute('/')
    }
  }

  render() {
    const { isFetching, messages } = this.props
    return <Callback isFetching={isFetching} messages={messages} />
  }
}

function mapStateToProps({ users, intl }) {
  return {
    isFetching: users.get('isFetching'),
    messages: {
      loading: intl.messages.loading,
    },
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...userActionCreators,
      ...routeActionCreators,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CallbackContainer)
