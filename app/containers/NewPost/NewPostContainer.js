import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NewPost } from 'components'
import { connect } from 'react-redux'

class NewPostContainer extends Component {
  static propTypes = {
    groupId: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
  }
  submit = (values) => {
    return new Promise((resolve, reject) => {
      console.log(values)
      resolve(true)
    })
  }
  render () {
    const {messages} = this.props
    return (
      <NewPost
        messages={messages}
        onSubmit={this.submit}/>
    )
  }
}

function mapStateToProps ({groups, intl}, props) {
  return {
    isFetching: groups.get('isFetching'),
    messages: {
      newQuestion: intl.messages.newQuestion,
    },
  }
}

export default connect(mapStateToProps)(NewPostContainer)
