import { Map, fromJS } from 'immutable'

const FETCHING_FRIENDS = 'FETCHING_FRIENDS'
const FETCHING_FRIENDS_ERROR = 'FETCHING_FRIENDS_ERROR'
const FETCHING_FRIENDS_SUCCESS = 'FETCHING_FRIENDS_SUCCESS'

function fetchingFriends () {
  return {
    type: FETCHING_FRIENDS,
  }
}

function fetchingFriendsError (error) {
  console.warn(error)
  return {
    type: FETCHING_FRIENDS_ERROR,
    error: 'Error fetching friends',
  }
}

export function fetchingFriendsSuccess (friends, count) {
  return {
    type: FETCHING_FRIENDS_SUCCESS,
    friends,
    count,
  }
}

const initialState = Map({
  isFetching: true,
  error: '',
  count: 0,
})

export default function friends (state = initialState, action) {
  switch (action.type) {
    case FETCHING_FRIENDS :
      return state.merge({
        isFetching: true,
      })
    case FETCHING_FRIENDS_ERROR :
      return state.merge({
        isFetching: false,
        error: action.error,
      })
    case FETCHING_FRIENDS_SUCCESS :
      return state.merge({
        isFetching: false,
        error: '',
        friends: Map(action.friends),
        count: action.count,
      })
    default :
      return state
  }
}
