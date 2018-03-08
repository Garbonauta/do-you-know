import React from 'react'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

const drawerStyle = {
  top: 'unset !important',
  left: 'unset !important',
}

export default function NavDrawer ({open}) {
  return (
    <Drawer containerStyle={drawerStyle} open={open}>
      <MenuItem>{'Test'}</MenuItem>
    </Drawer>
  )
}
NavDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
}
