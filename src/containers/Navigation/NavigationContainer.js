import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  DialogContainer,
  NavBarContainer,
  NavDrawerContainer,
} from 'containers'
import { withStyles } from 'material-ui/styles'
import { AllContent, ContentContainer, ContentArea, styles } from './Styles'
import { Global } from 'sharedStyles'

class NavigationContainer extends Component {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
  }
  state = {
    drawerOpen: true,
  }
  handleDrawerToggle = () =>
    this.setState(prevState => {
      return { drawerOpen: !prevState.drawerOpen }
    })
  render() {
    const {
      isAuthed,
      children,
      classes: { content, toolbar },
    } = this.props

    return (
      <AllContent>
        {isAuthed && <NavBarContainer drawerToggle={this.handleDrawerToggle} />}
        {isAuthed && <NavDrawerContainer open={this.state.drawerOpen} />}
        {isAuthed && <DialogContainer />}
        <ContentArea>
          <div className={toolbar} />
          <ContentContainer
            open={this.state.drawerOpen && isAuthed}
            className={content}
          >
            {children}
          </ContentContainer>
        </ContentArea>
      </AllContent>
    )
  }
}

export default withStyles(styles)(NavigationContainer)
