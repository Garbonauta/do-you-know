import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as postsActionCreators from 'redux/modules/posts'
import { NewPost } from 'components'

class NewPostContainer extends Component {
  static propTypes = {
    groupId: PropTypes.number.isRequired,
    accessToken: PropTypes.string.isRequired,
    authedUID: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
    postAndHandlePost: PropTypes.func.isRequired,
  }
  submit = (groupId, values) => {
    const { accessToken, postAndHandlePost, authedUID } = this.props
    values.owner = authedUID
    values.createdAt = Date.now()
    return postAndHandlePost(accessToken, groupId, values)
  }
  render() {
    const { messages, groupId } = this.props
    return (
      <NewPost messages={messages} groupId={groupId} onSubmit={this.submit} />
    )
  }
}

function mapStateToProps({ users, groups, intl }) {
  return {
    isFetching: groups.get('isFetching'),
    authedUID: users.get('uid'),
    accessToken: users.get('accessToken'),
    messages: {
      newQuestion: intl.messages['newPost.newQuestion'],
    },
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...postsActionCreators,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPostContainer)
