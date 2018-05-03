import React from 'react'
import PropTypes from 'prop-types'
import { Sidebar } from './Styles'
import GroupMenu from './GroupMenu'

function NavDrawer({
  open,
  groups,
  favoriteGroup,
  isFetching,
  messages,
  pathName,
  changeRoute,
}) {
  return (
    <Sidebar>
      {!isFetching && (
        <GroupMenu
          open={open}
          groups={groups}
          pathName={pathName}
          subheader={messages.group}
          changeRoute={changeRoute}
        />
      )}
    </Sidebar>
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
  pathName: PropTypes.string.isRequired,
  changeRoute: PropTypes.func.isRequired,
}

export default NavDrawer
