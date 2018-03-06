import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActionCreators from 'redux/modules/users'
import { Callback } from 'components'

class CallbackContainer extends Component {
  static propTypes = {
    fetchAndHandleAuthedUser: PropTypes.func.isRequired,
    messages: PropTypes.object.isRequired,
  }
  componentDidMount () {
    this.props.fetchAndHandleAuthedUser()
      .then(json => console.log('JSON', json))
  }
  render () {
    return (
      <Callback messages={this.props.messages}/>
    )
  }
}

function mapStateToProps ({intl}) {
  return {
    messages: {
      loading: intl.messages.loading,
    },
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      ...userActionCreators,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CallbackContainer)
