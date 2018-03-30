import { postGroupPost } from 'helpers/api'

export function postAndHandleGroupPost (accessToken, groupId, data) {
  return function (dispatch) {
    postGroupPost(accessToken, groupId, data)
  }
}
