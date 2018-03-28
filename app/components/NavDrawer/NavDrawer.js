import React from 'react'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Subheader from 'material-ui/Subheader'

const drawerStyle = {
  top: 'unset !important',
  left: 'unset !important',
  willChange: 'top, left',
}

export default function NavDrawer ({open, groups, favoriteGroup, isFetching, messages, groupAction}) {
  const sortedIds = Object.keys(groups)
  return (
    <Drawer containerStyle={drawerStyle} open={open}>
      <Subheader>{messages.group}</Subheader>
      {
        !isFetching &&
          sortedIds.map(id => {
            return (
              <MenuItem key={id} onClick={(e) => groupAction(e, id)}>{groups[id].name}</MenuItem>
            )
          })
      }
    </Drawer>
  )
}
NavDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  groups: PropTypes.object,
  favoriteGroup: PropTypes.string,
  groupAction: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  messages: PropTypes.shape({
    group: PropTypes.string.isRequired,
  }).isRequired,
}
