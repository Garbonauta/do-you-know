import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as groupPostsActionCreators from 'redux/modules/posts'
import { Post } from 'components'

class PostContainer extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    accessToken: PropTypes.string.isRequired,
    handleDeletePost: PropTypes.func.isRequired,
  }
  state = {
    actionMenuVisible: false,
  }
  handleClickAction = () => {
    this.setState({
      actionMenuVisible: !this.state.actionMenuVisible,
    })
  }
  handleCloseAction = () => {
    this.setState({
      actionMenuVisible: false,
    })
  }
  delete = async () => {
    const { accessToken, post: {groupId, postId}, handleDeletePost } = this.props
    try {
      await handleDeletePost(accessToken, groupId, postId)
    } catch (error) {
      this.setState({
        error,
      })
    }
  }
  render () {
    const { post } = this.props
    return (
      <Post
        actionOpen={this.state.actionMenuVisible}
        actionClick={this.handleClickAction}
        actionClose={this.handleCloseAction}
        post={post}/>
    )
  }
}

function mapStateToProps ({users}) {
  return {
    accessToken: users.get('accessToken'),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      ...groupPostsActionCreators,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer)
