import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { FormattedTime, FormattedRelative } from 'react-intl'
import { Manager, Target, Popper } from 'react-popper'
import ClickAwayListener from 'material-ui/utils/ClickAwayListener'
import Grow from 'material-ui/transitions/Grow'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from 'material-ui/Card'
import { MenuList, MenuItem } from 'material-ui/Menu'
import IconButton from 'material-ui/IconButton'
import MoreHorizIcon from 'material-ui-icons/MoreHoriz'
import { styles } from './Styles'

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

function PostMenu({ open, onClick, handleClose, deleteAction, messages }) {
  return (
    <div>
      <Manager>
        <Target>
          <IconButton onClick={onClick}>
            <MoreHorizIcon />
          </IconButton>
        </Target>
        <Popper placement="bottom-end" eventsEnabled={open}>
          <ClickAwayListener onClickAway={handleClose}>
            <Grow
              in={open}
              id="post-list-grow"
              style={{ transformOrigin: '0 0 0' }}
            >
              <Paper>
                <MenuList role="menu">
                  <MenuItem button={true} onClick={deleteAction}>
                    {messages['postMenu.delete']}
                  </MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>
        </Popper>
      </Manager>
    </div>
  )
}

PostMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  deleteAction: PropTypes.func.isRequired,
  messages: PropTypes.shape({
    'postMenu.delete': PropTypes.string.isRequired,
    'postMenu.edit': PropTypes.string.isRequired,
  }).isRequired,
}

function Post({
  actionOpen,
  actionClick,
  actionClose,
  deleteAction,
  post: { postId, text, createdAt, owner: { fullName, link, small } },
  messages,
  classes: { root },
}) {
  return (
    <Card className={root}>
      <CardHeader
        avatar={<Avatar src={small} />}
        title={fullName}
        subheader={<FormatDateString date={createdAt} />}
        action={
          <PostMenu
            open={actionOpen}
            onClick={actionClick}
            handleClose={actionClose}
            deleteAction={deleteAction}
            messages={messages}
          />
        }
      />
      <CardContent>
        <Typography variant="body1">{text}</Typography>
      </CardContent>
    </Card>
  )
}
Post.propTypes = {
  post: PropTypes.shape({
    postId: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    owner: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      small: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  actionOpen: PropTypes.bool.isRequired,
  actionClick: PropTypes.func.isRequired,
  actionClose: PropTypes.func.isRequired,
  deleteAction: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Post)
