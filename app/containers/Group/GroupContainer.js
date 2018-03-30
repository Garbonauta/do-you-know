import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Typography from 'material-ui/Typography'
import { NewPostContainer, PostListContainer } from 'containers'
import { Group, GroupSideBar } from 'components'
import { FlexDiv } from 'sharedStyles'

class GroupContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    groupId: PropTypes.string.isRequired,
    messages: PropTypes.shape({
      createdBy: PropTypes.string.isRequired,
      moderators: PropTypes.string.isRequired,
    }).isRequired,
    group: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      pictureUrl: PropTypes.string,
      owner: PropTypes.object,
      moderators: PropTypes.array,
    }),
  }
  render () {
    const {
      isFetching,
      groupId,
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
    } = this.props
    return (
      <div>
        {!isFetching && <FlexDiv>
          <Group>
            <Typography variant='title'>{name}</Typography>
            <NewPostContainer groupId={groupId}/>
            <PostListContainer groupId={groupId}/>
          </Group>
          <GroupSideBar
            owner={owner}
            createdByMsg={createdBy}
            moderators={moderators}
            moderatorMsg={moderatorMsg}/>
        </FlexDiv>}
      </div>
    )
  }
}

function mapStateToProps ({groups, intl}, props) {
  const groupId = props.match.params.groupId || ''
  const group = groups.get(groupId)
  return {
    isFetching: groups.get('isFetching'),
    groupId,
    group: group ? group.toJS() : {},
    messages: {
      moderators: intl.messages.moderators,
      createdBy: intl.messages.createdBy,
    },
  }
}

export default connect(mapStateToProps)(GroupContainer)
