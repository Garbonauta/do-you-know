import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as groupPostsActionCreators from 'redux/modules/posts'
import { PostList } from 'components'

class PostListContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    accessToken: PropTypes.string.isRequired,
    groupId: PropTypes.string.isRequired,
    posts: PropTypes.object,
    fetchAndHandleGroupPosts: PropTypes.func.isRequired,
  }
  state = {
    posts: {},
  }
  componentDidMount () {
    const {accessToken, fetchAndHandleGroupPosts, groupId} = this.props
    fetchAndHandleGroupPosts(accessToken, groupId)
  }
  componentDidUpdate ({groupId}) {
    if (this.props.groupId !== groupId) {
      const {accessToken, fetchAndHandleGroupPosts, groupId} = this.props
      fetchAndHandleGroupPosts(accessToken, groupId)
    }
  }
  render () {
    const { isFetching, posts } = this.props
    return (
      <PostList
        isFetching={isFetching}
        posts={posts}/>
    )
  }
}

function mapStateToProps ({users, posts, intl: {messages}}) {
  return {
    isFetching: posts.get('isFetching'),
    accessToken: users.get('accessToken'),
    posts: posts.get('posts'),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      ...groupPostsActionCreators,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer)
