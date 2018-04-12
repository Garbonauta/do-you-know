import React from 'react'
import PropTypes from 'prop-types'
import { Manager, Target, Popper } from 'react-popper'
import { withStyles } from 'material-ui/styles'
import ClickAwayListener from 'material-ui/utils/ClickAwayListener'
import Grow from 'material-ui/transitions/Grow'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import { MenuList, MenuItem } from 'material-ui/Menu'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import { Header, styles } from './Styles'

function AvatarMenu({ pictureUrl, open, onClick, handleClose, logout }) {
  return (
    <div>
      <Manager>
        <Target>
          <IconButton onClick={onClick}>
            <Avatar src={pictureUrl} style={{ cursor: 'pointer' }} />
          </IconButton>
        </Target>
        <Popper placement="bottom-end" eventsEnabled={open}>
          <ClickAwayListener onClickAway={handleClose}>
            <Grow
              in={open}
              id="menu-list-grow"
              style={{ transformOrigin: '0 0 0' }}
            >
              <Paper>
                <MenuList role="menu">
                  <MenuItem button={true} onClick={logout}>
                    {'Log Out'}
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

AvatarMenu.propTypes = {
  pictureUrl: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}

function NavBar({
  messages: { appName },
  pictureUrl,
  iconAction,
  avatarOpen,
  avatarClick,
  avatarRequestClose,
  handleHome,
  logout,
  classes: { appBar, title },
}) {
  return (
    <AppBar position="absolute" className={appBar}>
      <Toolbar>
        <IconButton color="inherit" onClick={iconAction}>
          <MenuIcon />
        </IconButton>
        <Header>
          <Typography
            variant="title"
            color="inherit"
            onClick={handleHome}
            className={title}
          >
            {appName}
          </Typography>
        </Header>
        <AvatarMenu
          pictureUrl={pictureUrl}
          open={avatarOpen}
          onClick={avatarClick}
          handleClose={avatarRequestClose}
          logout={logout}
        />
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
  avatarClick: PropTypes.func.isRequired,
  avatarRequestClose: PropTypes.func.isRequired,
  iconAction: PropTypes.func.isRequired,
  handleHome: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NavBar)
