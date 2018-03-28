import React from 'react'
import PropTypes from 'prop-types'
import { FlexDiv, GroupContent, Header, SideBar, SideBarEntry, Link } from './Styles'
import Subheader from 'material-ui/Subheader'

const sideBarSubheaderStyle = {
  fontSize: '1em',
  padding: '0',
  marginBottom: '5px',
  lineHeight: 'unset',
}
function GroupSideBar ({owner, createdByMsg, moderators, moderatorMsg}) {
  return (
    <SideBar>
      <SideBarEntry>
        <Subheader style={sideBarSubheaderStyle}>{createdByMsg}</Subheader>
        <Link href={owner.info.link} key={owner._id}>{owner.info.fullName}</Link>
      </SideBarEntry>
      <SideBarEntry>
        <Subheader style={sideBarSubheaderStyle}>{moderatorMsg}</Subheader>
        {moderators.map(({_id: id, info: {fullName, link}}) => {
          return (
            <Link href={link} key={id}>{fullName}</Link>
          )
        })}
      </SideBarEntry>
    </SideBar>
  )
}

GroupSideBar.propTypes = {
  owner: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    info: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    }).isRequired,
  }),
  createdByMsg: PropTypes.string.isRequired,
  moderators: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    info: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    }),
  })),
  moderatorMsg: PropTypes.string.isRequired,
}

export default function Group (
  {
    group:
      {
        name,
        pictureUrl,
        owner,
        moderators,
      },
    messages:
      {
        createdBy,
        moderators: moderatorMsg,
      },
  }) {
  return (
    <FlexDiv>
      <GroupContent>
        <Header>{name}</Header>
      </GroupContent>
      <GroupSideBar
        owner={owner}
        createdByMsg={createdBy}
        moderators={moderators}
        moderatorMsg={moderatorMsg}/>
    </FlexDiv>
  )
}

Group.propTypes = {
  messages: PropTypes.shape({
    createdBy: PropTypes.string.isRequired,
    moderators: PropTypes.string.isRequired,
  }).isRequired,
  group: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    pictureUrl: PropTypes.string,
    owner: PropTypes.object.isRequired,
    moderators: PropTypes.array.isRequired,
  }),
}
