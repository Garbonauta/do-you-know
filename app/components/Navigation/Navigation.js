import React from 'react'
import PropTypes from 'prop-types'
import { ProfileIcon } from './Styles'

export default function Navigation ({pictureUrl}) {
  return (
    <nav>
      <ProfileIcon url={pictureUrl} size={'32px'}/>
    </nav>
  )
}
Navigation.propTypes = {
  pictureUrl: PropTypes.string.isRequired,
}
