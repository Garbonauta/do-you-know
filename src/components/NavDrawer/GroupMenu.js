import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { MenuList, MenuItem } from 'material-ui/Menu'
import { List, ListItem, Icon, SubTitle } from './Styles'
import IconPicker from 'helpers/IconPicker'
import { SantaCruz, LaPaz } from 'helpers/svg'

class GroupMenuItem extends PureComponent {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    group: PropTypes.object.isRequired,
    changeRoute: PropTypes.func.isRequired,
    pathName: PropTypes.string.isRequired,
  }
  handleClick = e => {
    e.preventDefault()
    this.props.changeRoute(`/group/${this.props.group.id}`)
  }
  render() {
    const {
      open,
      group: { id, name },
    } = this.props
    return (
      <ListItem
        onClick={this.handleClick}
        selected={this.props.pathName === `/group/${id}`}
      >
        <Icon>
          <IconPicker id={id} />
        </Icon>
        {open && name}
      </ListItem>
    )
  }
}

export default function GroupMenu({
  open,
  groups,
  selected,
  subheader,
  pathName,
  changeRoute,
}) {
  return (
    <List>
      <SubTitle>{open && subheader}</SubTitle>
      {groups.map(group => {
        return (
          <GroupMenuItem
            key={group.id}
            open={open}
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
  open: PropTypes.bool.isRequired,
  groups: PropTypes.array,
  pathName: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
  changeRoute: PropTypes.func.isRequired,
}
