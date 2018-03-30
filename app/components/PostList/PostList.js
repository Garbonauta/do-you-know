import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import { CircularProgress } from 'material-ui/Progress'
import { styles } from './Styles'

function PostList ({isFetching, posts, classes: {root, progress}}) {
  return (
    <Paper className={root}>
      {isFetching && <CircularProgress className={progress} color='primary'/>}
      {!isFetching && <div>{JSON.stringify(posts)}</div>}
    </Paper>
  )
}
PostList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  posts: PropTypes.object,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostList)
