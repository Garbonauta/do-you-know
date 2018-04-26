import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import { PostList } from 'components'
import { POST_PAGE_COUNT } from 'helpers/constants'

function getPostsArray(obj) {
  const posts = obj && obj instanceof Map ? obj.toJS() : []
  if (Object.keys(posts).length === 0) {
    return []
  }
  return Object.values(posts).sort((a, b) => {
    return b.createdAt - a.createdAt
  })
}

class PostListContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    fetchNextAction: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired,
  }
  state = {
    getNext: true,
    prevPosts: null,
    posts: [],
  }
  onTargetViewChange = async viewState => {
    if (viewState) {
      const postId =
        this.state.posts.length > 0
          ? this.state.posts[this.state.posts.length - 1].postId
          : 0
      this.props.fetchNextAction(postId)
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const postsString = JSON.stringify(nextProps.posts)
    if (!prevState.prevPosts || prevState.prevPosts !== postsString) {
      const posts = getPostsArray(nextProps.posts)
      return {
        posts,
        prevPosts: JSON.stringify(nextProps.posts),
        getNext: posts.length >= POST_PAGE_COUNT,
      }
    } else if (prevState.prevPosts === postsString) {
      return {
        getNext: false,
      }
    }
    return null
  }
  render() {
    const { isFetching, messages } = this.props
    return (
      <PostList
        isFetching={isFetching}
        posts={this.state.posts}
        messages={messages}
        getNext={this.state.getNext}
        viewChangeAction={this.onTargetViewChange}
      />
    )
  }
}

function mapStateToProps({ users, posts, intl: { messages } }) {
  return {
    posts: posts.get('posts') || [],
    messages: {
      firstQuestion: messages['postList.firstQuestion'],
    },
  }
}

export default connect(mapStateToProps)(PostListContainer)
