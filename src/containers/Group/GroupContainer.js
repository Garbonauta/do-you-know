import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NewPostContainer, GroupPostListContainer } from 'containers'
import { Group, GroupContent, GroupSideBar, GroupHeader } from 'components'

class GroupContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    accessToken: PropTypes.string.isRequired,
    groupId: PropTypes.number.isRequired,
    messages: PropTypes.shape({
      createdBy: PropTypes.string.isRequired,
      moderators: PropTypes.string.isRequired,
    }).isRequired,
    group: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      pictureUrl: PropTypes.string,
      owner: PropTypes.object,
      moderators: PropTypes.array,
    }),
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
    const {
      isFetching,
      groupId,
      group: { name, pictureUrl, owner, moderators },
      messages: { createdBy, moderators: moderatorMsg },
    } = this.props
    const { sideBarVisible } = this.state
    return (
      !isFetching && (
        <Group>
          <GroupHeader
            title={name}
            sideBarVisible={sideBarVisible}
            toggleSideBar={this.toggleSideBar}
          />
          <GroupContent>
            <NewPostContainer groupId={groupId} />
            <GroupPostListContainer groupId={groupId} />
          </GroupContent>
          {sideBarVisible && (
            <GroupSideBar
              owner={owner}
              createdByMsg={createdBy}
              moderators={moderators}
              moderatorMsg={moderatorMsg}
            />
          )}
        </Group>
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
