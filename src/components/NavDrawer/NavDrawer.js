import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import { MenuList, MenuItem } from 'material-ui/Menu'
import { ListItemText, ListSubheader } from 'material-ui/List'
import { styles } from './Styles'

function NavDrawer({
  open,
  groups,
  favoriteGroup,
  isFetching,
  messages,
  groupAction,
  pathName,
  classes: { toolbar, paper, anchorLeft },
}) {
  const sortedIds = Object.keys(groups)
  return (
    <Drawer
      variant="persistent"
      open={open}
      classes={{ paper: paper, paperAnchorDockedLeft: anchorLeft }}
    >
      <div className={toolbar} />
      {!isFetching && (
        <MenuList subheader={<ListSubheader>{messages.group}</ListSubheader>}>
          {sortedIds.map(id => {
            const url = `/group/${id}`
            return (
              <MenuItem
                key={id}
                selected={pathName === url}
                onClick={e => groupAction(e, id)}
              >
                <ListItemText inset={true} primary={groups[id].name} />
              </MenuItem>
            )
          })}
        </MenuList>
      )}
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
  classes: PropTypes.object.isRequired,
  pathName: PropTypes.string.isRequired,
}

export default withStyles(styles)(NavDrawer)
