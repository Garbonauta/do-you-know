import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as postsActionCreators from 'redux/modules/posts'
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
  state = {
    open: false,
  }
  toggleOpen = () => {
    this.setState(prevState => {
      return {
        open: !prevState.open,
      }
    })
  }
  close = () => {
    return this.setState({
      open: false,
    })
  }
  submit = (groupId, values) => {
    const { groupName, accessToken, postAndHandlePost, authedUID } = this.props
    values.createdAt = Date.now()
    return postAndHandlePost(accessToken, groupId, values)
  }
  render() {
    const { messages, groupId, groupName, authedUID } = this.props
    return (
      <NewPost
        open={this.state.open}
        messages={messages}
        groupId={groupId}
        toggleOpen={this.toggleOpen}
        closeAction={this.close}
        initialFormValue={{
          groupId,
          groupName,
          owner: authedUID,
          postText: '',
        }}
        onSubmit={this.submit}
      />
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
