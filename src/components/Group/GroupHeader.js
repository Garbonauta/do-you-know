import React from 'react'
import PropTypes from 'prop-types'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import ExpandLessIcon from 'material-ui-icons/ExpandLess'
import { Header, HeaderContainer, Title, IconButton } from './Styles'

export default function GroupHeader({ title, sideBarVisible, toggleSideBar }) {
  return (
    <Header>
      <HeaderContainer>
        <Title>{title}</Title>
        <IconButton onClick={toggleSideBar}>
          {sideBarVisible ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </IconButton>
      </HeaderContainer>
    </Header>
  )
}
GroupHeader.propTypes = {
  title: PropTypes.string.isRequired,
  sideBarVisible: PropTypes.bool.isRequired,
  toggleSideBar: PropTypes.func.isRequired,
}
