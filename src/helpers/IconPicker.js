import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { SantaCruz, LaPaz } from './svg'

const SVG_LIB = {
  1: SantaCruz,
  2: LaPaz,
}

class IconPicker extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
  }
  state = {
    id: null,
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.id !== prevState.id) {
      return {
        id: nextProps.id,
        Component: SVG_LIB[nextProps.id],
      }
    }
    return null
  }
  render = () => {
    return <this.state.Component />
  }
}

export default IconPicker
