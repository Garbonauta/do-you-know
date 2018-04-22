import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { FormattedTime, FormattedRelative } from 'react-intl'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from 'material-ui/Card'
import { getActions } from './PostMenu'
import { styles } from './Styles'
import { NewCommentContainer } from 'containers'

function FormatDateString({ date }) {
  const DAY = 1000 * 60 * 60 * 24
  const dayAgo = date < Date.now() - DAY
  return (
    <span>
      <FormattedTime
        value={date}
        hour12={true}
        year="numeric"
        month="2-digit"
        day="2-digit"
        hour="2-digit"
        minute="2-digit"
        second="2-digit"
      />
      {!dayAgo && ' '}
      {!dayAgo && <FormattedRelative value={date} />}
    </span>
  )
}
FormatDateString.propTypes = {
  date: PropTypes.number.isRequired,
}

function Post({
  post: {
    postId,
    groupId,
    text,
    createdAt,
    owner: { fullName, link, picture, userId },
  },
  messages,
  classes: { root, commentRoot },
  ...postMenuProps
}) {
  return (
    <Card className={root}>
      <CardHeader
        avatar={<Avatar src={picture} />}
        title={fullName}
        subheader={<FormatDateString date={createdAt} />}
        action={getActions(postMenuProps, messages)}
      />
      <CardContent>
        <Typography>{text}</Typography>
      </CardContent>
      <CardContent classes={{ root: commentRoot }}>
        <NewCommentContainer
          postId={postId}
          postOwner={userId}
          groupId={groupId}
        />
      </CardContent>
    </Card>
  )
}
Post.propTypes = {
  post: PropTypes.shape({
    postId: PropTypes.number.isRequired,
    groupId: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    owner: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  owner: PropTypes.bool.isRequired,
  actionOpen: PropTypes.bool,
  actionClick: PropTypes.func,
  actionClose: PropTypes.func,
  deleteAction: PropTypes.func,
  messages: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Post)
