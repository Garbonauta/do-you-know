import React from 'react'
import PropTypes from 'prop-types'
import Observer from 'react-intersection-observer'
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
  viewChangeAction,
  getNext,
}) {
  return (
    <div>
      {!isFetching &&
        posts.length === 0 && (
          <EmptyWarn className={root}>
            <Typography variant="subheading" color="inherit">
              {firstQuestion}
            </Typography>
          </EmptyWarn>
        )}
      {posts.length > 0 && (
        <div>
          {posts.map(post => <PostContainer key={post.postId} post={post} />)}
          {!isFetching &&
            getNext && <Observer threshold={0.9} onChange={viewChangeAction} />}
          {isFetching && (
            <Paper className={root}>
              <CircularProgress className={progress} color="primary" />
            </Paper>
          )}
        </div>
      )}
    </div>
  )
}
PostList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  groupId: PropTypes.number.isRequired,
  posts: PropTypes.array.isRequired,
  messages: PropTypes.shape({
    firstQuestion: PropTypes.string.isRequired,
  }).isRequired,
  getNext: PropTypes.bool.isRequired,
  viewChangeAction: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostList)
