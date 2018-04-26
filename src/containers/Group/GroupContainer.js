import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Group } from 'components'

class GroupContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    accessToken: PropTypes.string.isRequired,
    groupId: PropTypes.number.isRequired,
  }
  state = {
    sideBarVisible: true,
  }
  toggleSideBar = e => {
    e.preventDefault()
    this.setState(prevState => {
      return {
        sideBarVisible: !prevState.sideBarVisible,
      }
    })
  }
  render() {
    const { isFetching, groupId, group, messages } = this.props
    return (
      !isFetching && (
        <Group
          groupId={groupId}
          group={group}
          sideBarVisible={this.state.sideBarVisible}
          sideBarAction={this.toggleSideBar}
          messages={messages}
        />
      )
    )
  }
}

function mapStateToProps({ users, groups, intl }, props) {
  const groupId = props.match.params.groupId
  const group = groups.get(groupId)
  return {
    isFetching: groups.get('isFetching'),
    accessToken: users.get('accessToken'),
    groupId: parseInt(groupId),
    group: group ? group.toJS() : {},
    messages: {
      moderators: intl.messages.moderators,
      createdBy: intl.messages.createdBy,
    },
  }
}

export default connect(mapStateToProps)(GroupContainer)
