import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import Popover from 'material-ui/Popover'
import { styles } from './Styles'

function AvatarMenu (
  {
    pictureUrl, open, anchor, onClick, handleRequestClose,
    logout,
  }) {
  return (
    <div>
      <Avatar src={pictureUrl} onClick={onClick} style={{cursor: 'pointer'}}/>
      <Popover
        open={open}
        anchorEl={anchor}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        onClose={handleRequestClose}>
        <List>
          <ListItem button={true} onClick={logout}>
            <ListItemText primary='Log Out'/>
          </ListItem>
        </List>
      </Popover>
    </div>
  )
}

AvatarMenu.propTypes = {
  pictureUrl: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  anchor: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}

function NavBar (
  {
    messages: {appName}, pictureUrl, iconAction,
    avatarOpen, avatarAnchor, avatarClick, avatarRequestClose,
    handleHome, logout, classes: {appBar, flex, title},
  }) {
  return (
    <AppBar position='absolute' className={appBar}>
      <Toolbar>
        <IconButton
          color='inherit'
          onClick={iconAction}>
          <MenuIcon/>
        </IconButton>
        <div className={flex}>
          <Typography
            variant='title'
            color='inherit'
            onClick={handleHome}
            className={title}>
            {appName}
          </Typography>
        </div>
        <IconButton>
          <AvatarMenu
            pictureUrl={pictureUrl}
            anchor={avatarAnchor}
            open={avatarOpen}
            onClick={avatarClick}
            handleRequestClose={avatarRequestClose}
            logout={logout}/>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
NavBar.propTypes = {
  messages: PropTypes.shape({
    appName: PropTypes.string.isRequired,
  }),
  pictureUrl: PropTypes.string.isRequired,
  avatarOpen: PropTypes.bool.isRequired,
  avatarAnchor: PropTypes.object,
  avatarClick: PropTypes.func.isRequired,
  avatarRequestClose: PropTypes.func.isRequired,
  iconAction: PropTypes.func.isRequired,
  handleHome: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NavBar)
