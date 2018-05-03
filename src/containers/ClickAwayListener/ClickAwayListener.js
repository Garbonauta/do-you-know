import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ClickAwayListener extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClickAway: PropTypes.func.isRequired,
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  setWrapperRef = node => {
    this.wrapperRef = node
  }

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.onClickAway()
    }
  }
  render() {
    return <div ref={this.setWrapperRef}>{this.props.children}</div>
  }
}

export default ClickAwayListener
