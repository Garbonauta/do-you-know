import React from 'react'
import PropTypes from 'prop-types'
import { Image, Container } from './Styles'

const Avatar = ({ src, size = 'medium', onClick }) => {
  return (
    <Container onClick={onClick}>
      <Image src={src} size={size} />
    </Container>
  )
}
Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.string,
  onClick: PropTypes.func,
}

export default Avatar
