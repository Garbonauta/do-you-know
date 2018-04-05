import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as groupPostsActionCreators from 'redux/modules/posts'
import { PostList } from 'components'

function getPostsArray(obj) {
  if (Object.keys(obj).length === 0) {
    return []
  }
  return Object.values(obj).sort((a, b) => {
    return b.createdAt - a.createdAt
  })
}

class PostListContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    accessToken: PropTypes.string.isRequired,
    groupId: PropTypes.number.isRequired,
    posts: PropTypes.array.isRequired,
    messages: PropTypes.object.isRequired,
    fetchAndHandleGroupPosts: PropTypes.func.isRequired,
  }
  state = {
    posts: {},
  }
  componentDidMount() {
    const { accessToken, fetchAndHandleGroupPosts, groupId } = this.props
    fetchAndHandleGroupPosts(accessToken, groupId, false)
  }
  componentDidUpdate({ groupId }) {
    if (this.props.groupId !== groupId) {
      const { accessToken, fetchAndHandleGroupPosts, groupId } = this.props
      fetchAndHandleGroupPosts(accessToken, groupId, true)
    }
  }
  render() {
    const { isFetching, posts, groupId, messages } = this.props
    return (
      <PostList
        isFetching={isFetching}
        groupId={groupId}
        posts={posts}
        messages={messages}
      />
    )
  }
}

function mapStateToProps({ users, posts, intl: { messages } }) {
  const { isFetching, lastUpdated, error, ...postObj } = posts.toJS()
  const postArr = getPostsArray(postObj)
  return {
    isFetching: isFetching,
    accessToken: users.get('accessToken'),
    posts: postArr || [],
    messages: {
      firstQuestion: messages['postList.firstQuestion'],
    },
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...groupPostsActionCreators,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer)
