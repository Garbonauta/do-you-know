import { push } from 'react-router-redux'

export function changeRoute (route) {
  return function (dispatch) {
    dispatch(push(route))
  }
}
