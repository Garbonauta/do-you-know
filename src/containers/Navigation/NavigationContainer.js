import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  DialogContainer,
  NavBarContainer,
  NavDrawerContainer,
} from 'containers'
import { withStyles } from 'material-ui/styles'
import { AllContent, ContentContainer, ContentArea } from './Styles'
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
    const { isAuthed, children } = this.props

    return (
      <AllContent>
        {isAuthed && <NavBarContainer drawerToggle={this.handleDrawerToggle} />}
        {isAuthed && <NavDrawerContainer open={this.state.drawerOpen} />}
        {isAuthed && <DialogContainer />}
        <ContentArea>
          <ContentContainer open={this.state.drawerOpen && isAuthed}>
            {children}
          </ContentContainer>
        </ContentArea>
      </AllContent>
    )
  }
}

export default NavigationContainer
