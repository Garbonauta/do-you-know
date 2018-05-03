import React from 'react'
import PropTypes from 'prop-types'
import {
  SideBar,
  sideBarStyles,
  Paper,
  Link,
  List,
  ListItem,
  Subheader,
} from './Styles'

function GroupSideBar({
  sideBarVisible,
  owner,
  createdByMsg,
  moderators,
  moderatorMsg,
}) {
  return (
    <SideBar sideBarVisible={sideBarVisible}>
      <Paper>
        <List>
          <Subheader>{createdByMsg}</Subheader>
          <ListItem>
            <Link href={owner.link}>{owner.fullName}</Link>
          </ListItem>
        </List>
        <List>
          <Subheader>{moderatorMsg}</Subheader>
          {moderators.map(({ userId, fullName, link }) => {
            return (
              <ListItem key={userId}>
                <Link href={link}>{fullName}</Link>
              </ListItem>
            )
          })}
        </List>
      </Paper>
    </SideBar>
  )
}

GroupSideBar.propTypes = {
  sideBarVisible: PropTypes.bool.isRequired,
  owner: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }),
  createdByMsg: PropTypes.string.isRequired,
  moderators: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string.isRequired,
      info: PropTypes.shape({
        fullName: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
      }),
    }),
  ),
  moderatorMsg: PropTypes.string.isRequired,
}

export default GroupSideBar
