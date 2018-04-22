import React from 'react'
import PropTypes from 'prop-types'
import { Manager, Target, Popper } from 'react-popper'
import ClickAwayListener from 'material-ui/utils/ClickAwayListener'
import Grow from 'material-ui/transitions/Grow'
import Paper from 'material-ui/Paper'
import { MenuList, MenuItem } from 'material-ui/Menu'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'

export default function UserMenu({
  pictureUrl,
  open,
  onClick,
  handleClose,
  logout,
}) {
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

UserMenu.propTypes = {
  pictureUrl: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}
