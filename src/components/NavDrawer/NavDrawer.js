import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import { styles } from './Styles'
import GroupMenu from './GroupMenu'

function NavDrawer({
  open,
  groups,
  favoriteGroup,
  isFetching,
  messages,
  pathName,
  changeRoute,
  classes: { toolbar, paper, anchorLeft },
}) {
  return (
    <Drawer
      variant="persistent"
      open={open}
      classes={{ paper: paper, paperAnchorDockedLeft: anchorLeft }}
    >
      <div className={toolbar} />
      {!isFetching && (
        <GroupMenu
          groups={groups}
          pathName={pathName}
          subheader={messages.group}
          changeRoute={changeRoute}
        />
      )}
    </Drawer>
  )
}
NavDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  groups: PropTypes.array,
  favoriteGroup: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  messages: PropTypes.shape({
    group: PropTypes.string.isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
  pathName: PropTypes.string.isRequired,
  changeRoute: PropTypes.func.isRequired,
}

export default withStyles(styles)(NavDrawer)
