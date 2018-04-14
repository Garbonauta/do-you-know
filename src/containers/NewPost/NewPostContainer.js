import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as postsActionCreators from 'redux/modules/posts'
import { formatSimpleUseFromStore } from 'helpers/utils'
import { NewPost } from 'components'

class NewPostContainer extends Component {
  static propTypes = {
    groupId: PropTypes.number.isRequired,
    groupName: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
    authedUID: PropTypes.string.isRequired,
    authedUser: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired,
    postAndHandlePost: PropTypes.func.isRequired,
  }
  submit = (groupId, values) => {
    const { groupName, accessToken, postAndHandlePost, authedUser } = this.props
    const owner = formatSimpleUseFromStore(authedUser)
    values.groupId = groupId
    values.groupName = groupName
    values.owner = owner
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

function mapStateToProps({ users, groups, intl }, { groupId }) {
  const authedUID = users.get('uid')
  return {
    isFetching: groups.get('isFetching'),
    groupName: groups.get(groupId.toString()).get('name') || '',
    authedUID,
    authedUser: users.get(authedUID),
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
