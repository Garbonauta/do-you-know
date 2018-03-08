import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavDrawer } from 'components'

class NavDrawerContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    messages: PropTypes.object.isRequired,
  }
  render () {
    const { open } = this.props
    return (
      <NavDrawer open={open}/>
    )
  }
}

function mapStateToProps ({groups, intl}) {
  return {
    isFetching: groups.get('isFetching'),
    messages: {
      loading: intl.messages.loading,
    },
  }
}


export default connect(mapStateToProps)(NavDrawerContainer)
