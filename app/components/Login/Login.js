import React from 'react'
import PropTypes from 'prop-types'
import { CenteredContainer } from 'sharedStyles'
import { FacebookButton } from './Styles'

export default function Login ({isFetching, onAuth}) {
  return (
    <CenteredContainer>
      <h1>{'Login'}</h1>
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
  onAuth: PropTypes.func.isRequired,
}
