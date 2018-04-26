import React from 'react'
import PropTypes from 'prop-types'
import { Content } from './Styles'

export default function GroupContent({ children }) {
  return <Content>{children}</Content>
}
GroupContent.propTypes = {
  children: PropTypes.node.isRequired,
}
