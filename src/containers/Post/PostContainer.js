import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as dialogActionCreators from 'redux/modules/dialog'
import { Post } from 'components'

class PostContainer extends Component {
  static propTypes = {
    uid: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    handleOpenDialog: PropTypes.func.isRequired,
    messages: PropTypes.object.isRequired,
  }
  state = {
    actionMenuVisible: false,
  }
  handleClickAction = () => {
    this.setState(prevState => {
      return {
        actionMenuVisible: !prevState.actionMenuVisible,
      }
    })
  }
  handleCloseAction = () => {
    this.setState({
      actionMenuVisible: false,
    })
  }
  delete = async () => {
    const {
      post: { groupId, postId },
      handleOpenDialog,
    } = this.props
    handleOpenDialog('DELETE_POST', { groupId, postId })
  }
  render() {
    const { post, messages, uid } = this.props
    return post.owner.userId === uid ? (
      <Post
        owner={true}
        actionOpen={this.state.actionMenuVisible}
        actionClick={this.handleClickAction}
        actionClose={this.handleCloseAction}
        deleteAction={this.delete}
        messages={messages}
        post={post}
      />
    ) : (
      <Post owner={false} messages={messages} post={post} />
    )
  }
}

function mapStateToProps({ users, intl: { messages } }) {
  return {
    uid: users.get('uid'),
    messages: {
      'postMenu.delete': messages['postMenu.delete'],
      'postMenu.edit': messages['postMenu.edit'],
    },
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...dialogActionCreators,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer)
