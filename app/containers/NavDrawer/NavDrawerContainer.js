import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavDrawer} from 'components'
import {Map} from 'immutable'

class NavDrawerContainer extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    uid: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
    groups: PropTypes.object,
    favoriteGroup: PropTypes.string,
    messages: PropTypes.object.isRequired,
  }

  render () {
    const {open, groups, favoriteGroup, isFetching, messages} = this.props
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

function mapStateToProps ({users, intl, groups}) {
  const uid = users.get('uid')
  return {
    isFetching: groups.get('isFetching'),
    uid,
    accessToken: users.get('accessToken'),
    groups: groups.filter(group => {
      return Map.isMap(group) && users.get(uid).get('userGroups').contains(group.get('id'))
    }).toJS() || {},
    favoriteGroup: users.get(uid).get('favoriteGroup'),
    messages: {
      loading: intl.messages.loading,
      group: intl.messages.group,
    },
  }
}

export default connect(mapStateToProps)(NavDrawerContainer)
