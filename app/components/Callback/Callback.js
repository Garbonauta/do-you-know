import React from 'react'
import PropTypes from 'prop-types'

export default function Callback ({isFetching, messages: {loading}}) {
  return (
    <h1>{loading}</h1>
  )
}

Callback.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  messages: PropTypes.shape({
    loading: PropTypes.string,
  }),
}
