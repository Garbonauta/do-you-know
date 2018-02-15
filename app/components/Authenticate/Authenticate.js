import React from 'react'
import PropTypes from 'prop-types'
import { CenteredContainer } from 'sharedStyles'
import { FacebookButton } from './Styles'

export default function Authenticate ({isFetching, onAuth}) {
  return (
    <CenteredContainer>
      <h1>{'Authenticate'}</h1>
      <FacebookButton onClick={onAuth} fontSize='1.5em' >
        {isFetching
          ? 'Loading'
          : 'Login with facebook'
        }
      </FacebookButton>
    </CenteredContainer>
  )
}
Authenticate.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
}
