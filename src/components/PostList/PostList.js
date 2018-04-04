import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import { CircularProgress } from 'material-ui/Progress'
import { PostContainer } from 'containers'
import { EmptyWarn, styles } from './Styles'

function PostList({
  isFetching,
  groupId,
  posts,
  messages: { firstQuestion },
  classes: { root, progress },
}) {
  return (
    <div>
      {isFetching && (
        <Paper className={root}>
          <CircularProgress className={progress} color="primary" />
        </Paper>
      )}
      {!isFetching &&
        posts.length === 0 && (
          <EmptyWarn className={root}>
            <Typography variant="subheading" color="inherit">
              {firstQuestion}
            </Typography>
          </EmptyWarn>
        )}
      {!isFetching &&
        posts.map(post => <PostContainer key={post.postId} post={post} />)}
    </div>
  )
}
PostList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  groupId: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  messages: PropTypes.shape({
    firstQuestion: PropTypes.string.isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostList)
