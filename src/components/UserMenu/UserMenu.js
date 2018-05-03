import React from 'react'
import PropTypes from 'prop-types'
import { Manager, Target, Popper } from 'react-popper'
import { ClickAwayListener } from 'containers'
import { Avatar } from 'components'
import { List, ListItem, Menu } from './Styles'

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
          <Avatar onClick={onClick} src={pictureUrl} />
        </Target>
        <Popper
          placement="bottom-end"
          eventsEnabled={open}
          style={{ zIndex: 1 }}
        >
          <ClickAwayListener onClickAway={handleClose}>
            {open && (
              <Menu>
                <List role="menu">
                  <ListItem button={true} onClick={logout}>
                    {'Log Out'}
                  </ListItem>
                </List>
              </Menu>
            )}
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
