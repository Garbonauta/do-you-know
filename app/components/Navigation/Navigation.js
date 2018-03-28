import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Avatar from 'material-ui/Avatar'
import Popover from 'material-ui/Popover'

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
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={handleRequestClose}>
        <Menu>
          <MenuItem primaryText='Sign Out' onClick={logout}/>
        </Menu>
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

const titleStyle = {
  cursor: 'pointer',
}

export default function Navigation (
  {
    messages, pictureUrl, iconAction,
    avatarOpen, avatarAnchor, avatarClick, avatarRequestClose,
    handleHome, logout,
  }) {
  return (
    <div>
      <AppBar
        title={messages.appName}
        titleStyle={titleStyle}
        onTitleClick={handleHome}
        onLeftIconButtonClick={iconAction}
        iconElementRight={<AvatarMenu
          pictureUrl={pictureUrl}
          open={avatarOpen}
          anchor={avatarAnchor}
          onClick={avatarClick}
          handleRequestClose={avatarRequestClose}
          logout={logout}/>}/>
    </div>
  )
}
Navigation.propTypes = {
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
}
