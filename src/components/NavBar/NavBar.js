import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import Typography from 'material-ui/Typography'
import { Header, styles } from './Styles'
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
  classes: { appBar, title },
}) {
  return (
    <AppBar position="absolute" className={appBar}>
      <Toolbar>
        <IconButton color="inherit" onClick={iconAction}>
          <MenuIcon />
        </IconButton>
        <Header>
          <Typography
            variant="title"
            color="inherit"
            onClick={handleHome}
            className={title}
          >
            {appName}
          </Typography>
        </Header>
        <UserMenuContainer />
      </Toolbar>
    </AppBar>
  )
}
NavBar.propTypes = {
  messages: PropTypes.shape({
    appName: PropTypes.string.isRequired,
  }),
  iconAction: PropTypes.func.isRequired,
  handleHome: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NavBar)
