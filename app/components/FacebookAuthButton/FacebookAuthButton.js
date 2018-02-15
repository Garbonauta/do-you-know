import React from 'react'
import PropTypes from 'prop-types'
import { FacebookButton } from 'sharedStyles'

FacebookAuthButton.propTypes = {
  onAuth: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
}
export default function FacebookAuthButton ({onAuth, isFetching}) {
  return (
    <FacebookButton onClick={onAuth} fontSize='1.5em' >
      {isFetching
        ? 'Loading'
        : 'Login with facebook'
      }
    </FacebookButton>
  )
}
