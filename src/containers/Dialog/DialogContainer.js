import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DeletePostDialogContainer from './DeletePostDialogContainer'

const MODAL_COMPONENTS = {
  DELETE_POST: DeletePostDialogContainer,
}

class DialogContainer extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    dialogType: PropTypes.string,
    dialogProps: PropTypes.object,
  }
  render() {
    const { open, dialogType, dialogProps } = this.props
    const Dialog = MODAL_COMPONENTS[dialogType]
    return open && <Dialog open={open} {...dialogProps.toJS()} />
  }
}

function mapStateToProps({ dialog }) {
  const dialogType = dialog.get('dialogType')
  return {
    open: (dialogType && dialog !== '') || false,
    dialogType,
    dialogProps: dialog.get('dialogProps'),
  }
}

export default connect(mapStateToProps)(DialogContainer)
