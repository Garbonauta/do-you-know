import React from 'react'
import PropTypes from 'prop-types'
import { FlexDiv } from './Styles'

export default function Group ({children}) {
  return (
    <FlexDiv>
      {children}
    </FlexDiv>
  )
}
Group.propTypes = {
  children: PropTypes.node.isRequired,
}
