import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { FormattedTime, FormattedRelative } from 'react-intl'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import { styles } from './Styles'

function FormatDateString ({date}) {
  const DAY = 1000 * 60 * 60 * 24
  const dayAgo = date < Date.now() - DAY
  return (
    <span>
      <FormattedTime
        value={date}
        hour12={true}
        year='numeric'
        month='2-digit'
        day='2-digit'
        hour='2-digit'
        minute='2-digit'
        second='2-digit'/>
      {!dayAgo && ' '}
      {!dayAgo && <FormattedRelative value={date} />}
    </span>
  )
}
FormatDateString.propTypes = {
  date: PropTypes.number.isRequired,
}

function Post (
  {
    post: {postId, text, createdAt, owner: {fullName, link, small}},
    classes: {root},
  }) {
  return (
    <Card className={root}>
      <CardHeader
        avatar={<Avatar src={small}/>}
        title={fullName}
        subheader={<FormatDateString date={createdAt}/>}/>
      <CardContent>
        <Typography variant='body1'>{text}</Typography>
      </CardContent>
    </Card>
  )
}
Post.propTypes = {
  post: PropTypes.shape({
    postId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    owner: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      small: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Post)
