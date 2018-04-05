import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as dialogActionCreators from 'redux/modules/dialog'
import * as postsActionCreators from 'redux/modules/posts'
import { DeletePostDialog } from 'components'

class DeletePostDialogContainer extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    groupId: PropTypes.number.isRequired,
    postId: PropTypes.number.isRequired,
    accessToken: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
    handleDeletePost: PropTypes.func.isRequired,
    handleCloseDialog: PropTypes.func.isRequired,
  }
  onAcceptClick = async e => {
    e.preventDefault()
    const {
      accessToken,
      groupId,
      postId,
      handleDeletePost,
      handleCloseDialog,
    } = this.props
    try {
      await handleDeletePost(accessToken, groupId, postId)
      handleCloseDialog()
    } catch (e) {
      handleCloseDialog()
    }
  }
  onClose = e => {
    this.props.handleCloseDialog()
  }
  render() {
    return (
      <DeletePostDialog
        open={this.props.open}
        onAcceptClick={this.onAcceptClick}
        onClose={this.onClose}
        messages={this.props.messages}
      />
    )
  }
}

function mapStateToProps({ users, intl }) {
  return {
    accessToken: users.get('accessToken'),
    messages: {
      title: intl.messages['deleteDialog.title'],
      description: intl.messages['deleteDialog.description'],
      cancel: intl.messages.cancel,
      yes: intl.messages.yes,
    },
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...dialogActionCreators,
      ...postsActionCreators,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(
  DeletePostDialogContainer
)
