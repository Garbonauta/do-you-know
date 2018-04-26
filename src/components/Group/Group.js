import React from 'react'
import PropTypes from 'prop-types'
import { FlexDiv } from './Styles'
import { GroupSideBar, GroupHeader } from 'components'
import { NewPostContainer, GroupPostListContainer } from 'containers'
import { Body, Content } from './Styles'

export default function Group({
  groupId,
  group: { name, pictureUrl, owner, moderators },
  messages: { createdBy, moderators: moderatorMsg },
  sideBarVisible,
  sideBarAction,
}) {
  return (
    <FlexDiv>
      <GroupHeader
        title={name}
        sideBarVisible={sideBarVisible}
        toggleSideBar={sideBarAction}
      />
      <Body>
        <Content>
          <NewPostContainer groupId={groupId} />
          <GroupPostListContainer groupId={groupId} />
        </Content>
        {sideBarVisible && (
          <GroupSideBar
            owner={owner}
            createdByMsg={createdBy}
            moderators={moderators}
            moderatorMsg={moderatorMsg}
          />
        )}
      </Body>
    </FlexDiv>
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
