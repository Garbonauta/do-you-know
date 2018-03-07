import React from 'react'
import PropTypes from 'prop-types'
import Loader from 'react-loader'

export default function Callback ({isFetching, messages: {loading}}) {
  return (
    <Loader loaded={!isFetching}>
      <h1>{loading}</h1>
    </Loader>
  )
}

Callback.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  messages: PropTypes.shape({
    loading: PropTypes.string,
  }),
}
