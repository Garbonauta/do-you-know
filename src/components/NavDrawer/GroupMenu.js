import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { MenuList, MenuItem } from 'material-ui/Menu'
import { List, ListItem, ListText, SubTitle } from './Styles'

class GroupMenuItem extends PureComponent {
  static propTypes = {
    group: PropTypes.object.isRequired,
    changeRoute: PropTypes.func.isRequired,
    pathName: PropTypes.string.isRequired,
  }
  handleClick = e => {
    e.preventDefault()
    this.props.changeRoute(`/group/${this.props.group.id}`)
  }
  render() {
    const { id, name } = this.props.group
    return (
      <ListItem
        onClick={this.handleClick}
        selected={this.props.pathName === `/group/${id}`}
      >
        <ListText>{name}</ListText>
      </ListItem>
    )
  }
}

export default function GroupMenu({
  groups,
  selected,
  subheader,
  pathName,
  changeRoute,
}) {
  return (
    <List>
      <SubTitle>{subheader}</SubTitle>
      {groups.map(group => {
        return (
          <GroupMenuItem
            key={group.id}
            group={group}
            pathName={pathName}
            changeRoute={changeRoute}
          />
        )
      })}
    </List>
  )
}
GroupMenu.propTypes = {
  groups: PropTypes.array,
  pathName: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
  changeRoute: PropTypes.func.isRequired,
}
