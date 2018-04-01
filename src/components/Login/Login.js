import React from 'react'
import PropTypes from 'prop-types'
import { CenteredContainer } from 'sharedStyles'
import { FacebookButton, LoginError } from './Styles'

export default function Login ({isFetching, error, onAuth}) {
  return (
    <CenteredContainer>
      <h1>{'Login'}</h1>
      {error && <LoginError>{error}</LoginError>}
      <FacebookButton onClick={onAuth} fontSize='1.5em' >
        {isFetching
          ? 'Loading'
          : 'Login with facebook'
        }
      </FacebookButton>
    </CenteredContainer>
  )
}
Login.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  onAuth: PropTypes.func.isRequired,
}
