import React from 'react'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Subheader from 'material-ui/Subheader'

const drawerStyle = {
  background: 'white',
  top: 'unset !important',
  left: 'unset !important',
  willChange: 'top, left',
  boxShadow: 'rgba(0, 0, 0, 0.16) 1px 3px 8px, rgba(0, 0, 0, 0.23) 1px 3px 8px',
}

export default function NavDrawer ({open, groups, favoriteGroup, isFetching, messages}) {
  const sortedIds = Object.keys(groups)
  return (
    <Drawer containerStyle={drawerStyle} open={open}>
      <Subheader>{messages.group}</Subheader>
      {
        !isFetching &&
          sortedIds.map(id => {
            return (
              <MenuItem key={id}>{groups[id].name}</MenuItem>
            )
          })
      }
    </Drawer>
  )
}
NavDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  groups: PropTypes.object,
  favoriteGroup: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
  messages: PropTypes.shape({
    group: PropTypes.string.isRequired,
  }).isRequired,
}
