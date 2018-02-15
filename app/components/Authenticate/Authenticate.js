import React from 'react'
import PropTypes from 'prop-types'
import { FacebookAuthButton } from 'components'
import { CenteredContainer } from 'sharedStyles'

export default function Authenticate ({isFetching, onAuth}) {
  return (
    <CenteredContainer>
      <h1>{'Authenticate'}</h1>
      <FacebookAuthButton onAuth={onAuth} isFetching={isFetching}/>
    </CenteredContainer>
  )
}
Authenticate.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
}
