import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { PostListContainer } from 'containers'
import * as groupPostsActionCreators from 'redux/modules/posts'

class GroupPostListContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    groupId: PropTypes.number.isRequired,
    accessToken: PropTypes.string.isRequired,
    fetchAndHandleGroupPosts: PropTypes.func.isRequired,
  }
  handleGetMorePosts = async postId => {
    const { accessToken, fetchAndHandleGroupPosts, groupId } = this.props
    await fetchAndHandleGroupPosts({ accessToken, groupId, postId })
  }
  componentDidMount = async () => {
    const { accessToken, fetchAndHandleGroupPosts, groupId } = this.props
    await fetchAndHandleGroupPosts({ accessToken, groupId })
  }
  componentDidUpdate = async ({ groupId }) => {
    if (this.props.groupId !== groupId) {
      const { accessToken, fetchAndHandleGroupPosts, groupId } = this.props
      await fetchAndHandleGroupPosts({
        accessToken,
        groupId,
        clear: true,
      })
    }
  }
  render() {
    return (
      <PostListContainer
        isFetching={this.props.isFetching}
        fetchNextAction={this.handleGetMorePosts}
      />
    )
  }
}

function mapStateToProps({ users, posts }) {
  return {
    isFetching: posts.get('isFetching'),
    accessToken: users.get('accessToken'),
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

export default connect(mapStateToProps, mapDispatchToProps)(
  GroupPostListContainer
)
