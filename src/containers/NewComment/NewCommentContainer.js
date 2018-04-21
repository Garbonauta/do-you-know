import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as commentsActionCreators from 'redux/modules/comments'
import { NewComment } from 'components'
import { formatSimpleUseFromStore } from 'helpers/utils'

class NewCommentContainer extends Component {
  static propTypes = {
    postId: PropTypes.number.isRequired,
    groupId: PropTypes.number.isRequired,
    accessToken: PropTypes.string.isRequired,
    authedUID: PropTypes.string.isRequired,
    authedUser: PropTypes.object.isRequired,
    handleSubmitComment: PropTypes.func.isRequired,
  }
  state = {
    text: '',
  }
  handleChange = e => {
    this.setState({
      text: e.target.value,
    })
  }
  handleEnter = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (this.state.text.length < 1) {
        return
      }

      const {
        accessToken,
        postId,
        groupId,
        authedUID,
        authedUser,
        handleSubmitComment,
      } = this.props
      const owner = formatSimpleUseFromStore(authedUser)

      const comment = {
        postId,
        groupId,
        text: e.target.value,
        owner,
        createdAt: Date.now(),
        score: 1,
        votes: { [authedUID]: '1' },
      }
      if (handleSubmitComment(accessToken, comment)) {
        e.target.value = ''
      }
    }
  }
  render() {
    const { authedUser, messages } = this.props
    const avatar = authedUser
      .get('info')
      .get('pictures')
      .get('small')
    return (
      <NewComment
        avatar={avatar}
        messages={messages}
        value={this.state.text}
        handleChange={this.handleChange}
        keyPressAction={this.handleEnter}
      />
    )
  }
}

function mapStateToProps({ users, groups, intl }) {
  const authedUID = users.get('uid')
  return {
    isFetching: groups.get('isFetching'),
    authedUID,
    authedUser: users.get(authedUID),
    accessToken: users.get('accessToken'),
    messages: {
      placeholder: intl.messages['comment.placeholder'],
    },
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...commentsActionCreators,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCommentContainer)
