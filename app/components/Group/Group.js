import React from 'react'
import PropTypes from 'prop-types'
import { GroupContent } from './Styles'

export default function Group ({children}) {
  return (
    <GroupContent>
      {children}
    </GroupContent>
  )
}
Group.propTypes = {
  children: PropTypes.node.isRequired,
}
