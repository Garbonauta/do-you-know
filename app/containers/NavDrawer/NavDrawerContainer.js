import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as groupsActionCreators from 'redux/modules/groups'
import { NavDrawer } from 'components'

class NavDrawerContainer extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    uid: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
    groups: PropTypes.object,
    favoriteGroup: PropTypes.string,
    messages: PropTypes.object.isRequired,
    fetchAndHandleGroups: PropTypes.func.isRequired,
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

function mapStateToProps ({users, intl}) {
  const uid = users.get('uid')
  return {
    isFetching: users.get('isFetching'),
    uid,
    accessToken: users.get('accessToken'),
    groups: users.get(uid).get('groups').toJS(),
    favoriteGroup: users.get(uid).get('favoriteGroup'),
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
