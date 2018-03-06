import React from 'react'
import PropTypes from 'prop-types'

export default function Callback ({messages: {loading}}) {
  return (
    <h1>{loading}</h1>
  )
}

Callback.propTypes = {
  messages: PropTypes.shape({
    loading: PropTypes.string,
  }),
}
