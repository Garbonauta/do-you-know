import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Typography from 'material-ui/Typography'
import { SideBar, sideBarStyles } from './Styles'

function GroupSideBar ({owner, createdByMsg, moderators, moderatorMsg, classes: {list, listItem, listItemText}}) {
  return (
    <SideBar>
      <List className={list} subheader={<Typography variant='caption'>{createdByMsg}</Typography>}>
        <ListItem
          className={listItem}
          component='a'
          href={owner.info.link}>
          <ListItemText classes={{primary: listItemText}} primary={owner.info.fullName}/>
        </ListItem>
      </List>
      <List className={list} subheader={<Typography variant='caption'>{moderatorMsg}</Typography>}>
        {moderators.map(({_id: id, info: {fullName, link}}) => {
          return (
            <ListItem
              key={id}
              className={listItem}
              component='a'
              href={link}>
              <ListItemText classes={{primary: listItemText}} primary={fullName}/>
            </ListItem>
          )
        })}
      </List>
    </SideBar>
  )
}

GroupSideBar.propTypes = {
  owner: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    info: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    }).isRequired,
  }),
  createdByMsg: PropTypes.string.isRequired,
  moderators: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    info: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    }),
  })),
  moderatorMsg: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(sideBarStyles)(GroupSideBar)
