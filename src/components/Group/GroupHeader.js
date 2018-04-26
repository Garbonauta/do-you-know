import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import ExpandLessIcon from 'material-ui-icons/ExpandLess'
import { Header, Title } from './Styles'

export default function GroupHeader({ title, sideBarVisible, toggleSideBar }) {
  return (
    <Header>
      <Toolbar disableGutters={true}>
        <Title>
          <Typography variant="title">{title}</Typography>
        </Title>
        <IconButton onClick={toggleSideBar}>
          {sideBarVisible ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </IconButton>
      </Toolbar>
    </Header>
  )
}
GroupHeader.propTypes = {
  title: PropTypes.string.isRequired,
  sideBarVisible: PropTypes.bool.isRequired,
  toggleSideBar: PropTypes.func.isRequired,
}
