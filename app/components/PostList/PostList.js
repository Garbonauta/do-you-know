import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import { CircularProgress } from 'material-ui/Progress'
import { PostContainer } from 'containers'
import { styles } from './Styles'

function PostList ({isFetching, groupId, posts, classes: {root, progress}}) {
  return (
    <div>
      {isFetching &&
        <Paper className={root}>
          <CircularProgress className={progress} color='primary'/>
        </Paper>}
      {
        !isFetching &&
          posts.map(post => (
            <PostContainer
              key={post.postId}
              post={post}/>
          ))
      }
    </div>
  )
}
PostList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  groupId: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostList)
