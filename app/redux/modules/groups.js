import { Map, fromJS } from 'immutable'
import { groupsObjectFromArray } from 'helpers/utils'

const FETCHING_GROUPS = 'FETCHING_GROUPS'
const FETCHING_GROUPS_ERROR = 'FETCHING_GROUPS_ERROR'
const FETCHING_GROUPS_SUCCESS = 'FETCHING_GROUPS_SUCCESS'

function fetchingGroups () {
  return {
    type: FETCHING_GROUPS,
  }
}

function fetchingGroupsError (error) {
  console.warn(error)
  return {
    type: FETCHING_GROUPS_ERROR,
    error: 'Error fetching groups',
  }
}

function fetchingGroupsSuccess ({favorite, groups}) {
  return {
    type: FETCHING_GROUPS_SUCCESS,
    timestamp: Date.now(),
    favorite,
    groups,
  }
}

const initialState = Map({
  isFetching: true,
  lastUpdated: 0,
  groups: Map({}),
})

export default function groups (state = initialState, action) {
  switch (action.type) {
    case FETCHING_GROUPS :
      return state.merge({
        isFetching: true,
      })
    case FETCHING_GROUPS_ERROR :
      return state.merge({
        isFetching: false,
        error: action.error,
      })
    case FETCHING_GROUPS_SUCCESS :
      return state.merge({
        isFetching: false,
        lastUpdated: action.timestamp,
        favorite: action.favorite,
        groups: fromJS({
          ...action.groups,
        }),
      })
    default:
      return state
  }
}
