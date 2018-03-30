import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as groupPostsActionCreators from 'redux/modules/groupPosts'
import { NewPost } from 'components'

class NewPostContainer extends Component {
  static propTypes = {
    groupId: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
    authedUID: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
    postAndHandleGroupPost: PropTypes.func.isRequired,
  }
  submit = (groupId, values) => {
    const {accessToken, postAndHandleGroupPost, authedUID} = this.props
    values.owner = authedUID
    return postAndHandleGroupPost(accessToken, groupId, values)
  }
  render () {
    const {messages, groupId} = this.props
    return (
      <NewPost
        messages={messages}
        groupId={groupId}
        onSubmit={this.submit}/>
    )
  }
}

function mapStateToProps ({users, groups, intl}) {
  return {
    isFetching: groups.get('isFetching'),
    authedUID: users.get('uid'),
    accessToken: users.get('accessToken'),
    messages: {
      newQuestion: intl.messages.newQuestion,
    },
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      ...groupPostsActionCreators,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPostContainer)
