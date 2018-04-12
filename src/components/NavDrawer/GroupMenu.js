import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { MenuList, MenuItem } from 'material-ui/Menu'
import { ListItemText, ListSubheader } from 'material-ui/List'

class GroupMenuItem extends PureComponent {
  static propTypes = {
    group: PropTypes.object.isRequired,
    changeRoute: PropTypes.func.isRequired,
  }
  handleClick = e => {
    e.preventDefault()
    this.props.changeRoute(`/group/${this.props.group.id}`)
  }
  render() {
    const { id, name } = this.props.group
    return (
      <MenuItem key={id} onClick={this.handleClick}>
        <ListItemText inset={true} primary={name} />
      </MenuItem>
    )
  }
}

export default function GroupMenu({
  groups,
  selected,
  subheader,
  changeRoute,
}) {
  return (
    <MenuList subheader={<ListSubheader>{subheader}</ListSubheader>}>
      {groups.map(group => {
        return (
          <GroupMenuItem
            key={group.id}
            group={group}
            changeRoute={changeRoute}
          />
        )
      })}
    </MenuList>
  )
}
GroupMenu.propTypes = {
  groups: PropTypes.array,
  pathName: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
  changeRoute: PropTypes.func.isRequired,
}
