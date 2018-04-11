import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as groupPostsActionCreators from 'redux/modules/posts'
import { PostList } from 'components'
import { POST_PAGE_COUNT } from 'helpers/constants'

function getPostsArray(obj) {
  if (Object.keys(obj).length === 0) {
    return []
  }
  return Object.values(obj).sort((a, b) => {
    return b.createdAt - a.createdAt
  })
}

function getPostCount({ posts }) {
  return Object.keys(posts).length
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
    getNext: true,
  }
  componentDidMount = async () => {
    const { accessToken, fetchAndHandleGroupPosts, groupId } = this.props
    const payload = await fetchAndHandleGroupPosts({ accessToken, groupId })
    this.setState({
      getNext: getPostCount(payload) >= POST_PAGE_COUNT,
    })
  }
  componentDidUpdate = async ({ groupId, posts }) => {
    if (this.props.groupId !== groupId) {
      const { accessToken, fetchAndHandleGroupPosts, groupId } = this.props
      const payload = await fetchAndHandleGroupPosts({
        accessToken,
        groupId,
        clear: true,
      })
      this.setState({
        getNext: getPostCount(payload) >= POST_PAGE_COUNT,
      })
    }
  }
  onTargetViewChange = async viewState => {
    const { accessToken, fetchAndHandleGroupPosts, groupId, posts } = this.props
    const postId = posts.length > 0 ? posts[posts.length - 1].postId : 0
    if (viewState) {
      const payload = await fetchAndHandleGroupPosts({
        accessToken,
        groupId,
        postId,
      })
      Object.keys(payload.posts).length === 0 &&
        this.setState({
          getNext: false,
        })
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
        getNext={this.state.getNext}
        viewChangeAction={this.onTargetViewChange}
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
