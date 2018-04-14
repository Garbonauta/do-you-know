import React from 'react'
import PropTypes from 'prop-types'
import { Manager, Target, Popper } from 'react-popper'
import ClickAwayListener from 'material-ui/utils/ClickAwayListener'
import Grow from 'material-ui/transitions/Grow'
import Paper from 'material-ui/Paper'
import { MenuList, MenuItem } from 'material-ui/Menu'
import IconButton from 'material-ui/IconButton'
import MoreHorizIcon from 'material-ui-icons/MoreHoriz'

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

export function getActions(
  { owner, actionOpen, actionClick, actionClose, deleteAction },
  messages
) {
  return owner ? (
    <PostMenu
      open={actionOpen}
      onClick={actionClick}
      handleClose={actionClose}
      deleteAction={deleteAction}
      messages={messages}
    />
  ) : null
}
