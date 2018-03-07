import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navigation } from 'components'

class NavigationContainer extends Component {
  static propTypes = {
    pictureUrl: PropTypes.string.isRequired,
  }
  render () {
    const { pictureUrl } = this.props

    return (
      <Navigation pictureUrl={pictureUrl}/>
    )
  }
}

function mapStateToProps ({users}) {
  const uid = users.get('uid')

  return {
    pictureUrl: uid ? users.get(uid).get('info').get('details').get('picture') : '',
  }
}

export default connect(mapStateToProps)(NavigationContainer)
