import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Group } from 'components'

class GroupContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    group: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired,
  }
  render () {
    const {isFetching, messages, group} = this.props
    return (
      <div>
        {!isFetching && <Group messages={messages} group={group} />}
      </div>
    )
  }
}

function mapStateToProps ({groups, intl}, props) {
  const groupId = props.match.params.groupId
  const group = groups.get(groupId)
  return {
    isFetching: groups.get('isFetching'),
    group: group ? group.toJS() : {},
    messages: {
      moderators: intl.messages.moderators,
      createdBy: intl.messages.createdBy,
    },
  }
}

export default connect(mapStateToProps)(GroupContainer)
