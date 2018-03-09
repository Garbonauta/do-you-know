import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as groupsActionCreators from 'redux/modules/groups'
import { NavDrawer } from 'components'
import messages from '../../data/messages/es'

class NavDrawerContainer extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    uid: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
    groups: PropTypes.object,
    favoriteGroup: PropTypes.number,
    messages: PropTypes.object.isRequired,
    fetchAndHandleGroups: PropTypes.func.isRequired,
  }
  componentDidMount = async () => {
    const { accessToken, uid, fetchAndHandleGroups } = this.props
    await fetchAndHandleGroups(accessToken, uid, fetchAndHandleGroups)
  }
  render () {
    const { open, groups, favoriteGroup, isFetching, messages } = this.props
    return (
      <NavDrawer
        open={open}
        isFetching={isFetching}
        groups={groups}
        favoriteGroup={favoriteGroup}
        messages={messages}/>
    )
  }
}

function mapStateToProps ({groups, users, intl}) {
  return {
    isFetching: groups.get('isFetching'),
    uid: users.get('uid'),
    accessToken: users.get('accessToken'),
    groups: groups.get('groups').toJS(),
    favoriteGroup: groups.get('favorite'),
    messages: {
      loading: intl.messages.loading,
      group: intl.messages.group,
    },
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      ...groupsActionCreators,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavDrawerContainer)
