import React from 'react'
import PropTypes from 'prop-types'
import { Hamburger } from 'helpers/svg'
import { Nav, NavGrid, NavIcon, AvatarMenu, Title, Header } from './Styles'
import { UserMenuContainer } from 'containers'

function NavBar({
  messages: { appName },
  pictureUrl,
  iconAction,
  avatarOpen,
  avatarClick,
  avatarRequestClose,
  handleHome,
  logout,
}) {
  return (
    <Nav>
      <NavGrid>
        <NavIcon onClick={iconAction}>
          <Hamburger />
        </NavIcon>
        <Title>
          <Header onClick={handleHome}>{appName}</Header>
        </Title>
        <AvatarMenu>
          <UserMenuContainer />
        </AvatarMenu>
      </NavGrid>
    </Nav>
  )
}
NavBar.propTypes = {
  messages: PropTypes.shape({
    appName: PropTypes.string.isRequired,
  }),
  iconAction: PropTypes.func.isRequired,
  handleHome: PropTypes.func.isRequired,
}

export default NavBar
