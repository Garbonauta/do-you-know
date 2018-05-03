import React from 'react'
import PropTypes from 'prop-types'
import { GroupGrid } from './Styles'
import { GroupSideBar, GroupHeader } from 'components'
import { NewPostContainer, GroupPostListContainer } from 'containers'
import { Content, Posts } from './Styles'

export default function Group({
  groupId,
  group: { name, pictureUrl, owner, moderators },
  messages: { createdBy, moderators: moderatorMsg },
  sideBarVisible,
  sideBarAction,
}) {
  return (
    <GroupGrid>
      <GroupHeader
        title={name}
        sideBarVisible={sideBarVisible}
        toggleSideBar={sideBarAction}
      />
      <Content sideBarVisible={sideBarVisible}>
        <Posts>
          <NewPostContainer groupId={groupId} />
          <GroupPostListContainer groupId={groupId} />
        </Posts>
      </Content>
      <GroupSideBar
        sideBarVisible={sideBarVisible}
        owner={owner}
        createdByMsg={createdBy}
        moderators={moderators}
        moderatorMsg={moderatorMsg}
      />
    </GroupGrid>
  )
}
Group.propTypes = {
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
  sideBarVisible: PropTypes.bool.isRequired,
  sideBarAction: PropTypes.func.isRequired,
}
