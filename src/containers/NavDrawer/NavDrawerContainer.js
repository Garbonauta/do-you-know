import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Map } from 'immutable'
import { NavDrawer } from 'components'
import * as routeActionCreators from 'redux/modules/route'

class NavDrawerContainer extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    uid: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
    groups: PropTypes.object,
    favoriteGroup: PropTypes.string,
    messages: PropTypes.object.isRequired,
    changeRoute: PropTypes.func.isRequired,
    pathName: PropTypes.string.isRequired,
  }
  state = {
    groups: null,
  }
  componentDidMount() {
    this.setState({
      groups: Object.values(this.props.groups),
    })
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.groups !== nextProps.groups) {
      return {
        groups: Object.values(nextProps.groups),
      }
    }
  }
  render() {
    const {
      open,
      favoriteGroup,
      isFetching,
      messages,
      pathName,
      changeRoute,
    } = this.props
    return (
      <NavDrawer
        open={open}
        isFetching={isFetching}
        groups={this.state.groups}
        favoriteGroup={favoriteGroup}
        messages={messages}
        pathName={pathName}
        changeRoute={changeRoute}
      />
    )
  }
}

function mapStateToProps({ users, intl, groups, routing }) {
  const uid = users.get('uid')
  return {
    isFetching: groups.get('isFetching'),
    uid,
    accessToken: users.get('accessToken'),
    groups:
      groups
        .filter(group => {
          return (
            Map.isMap(group) &&
            users
              .get(uid)
              .get('userGroups')
              .contains(group.get('id'))
          )
        })
        .toJS() || {},
    favoriteGroup: users.get(uid) ? users.get(uid).get('favoriteGroup') : '',
    messages: {
      loading: intl.messages.loading,
      group: intl.messages.group,
    },
    pathName: routing.location.pathname,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...routeActionCreators,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavDrawerContainer)
