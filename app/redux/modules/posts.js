import { Map, fromJS } from 'immutable'
import { getGroupPosts, postGroupPost } from 'helpers/api'

const FETCHING_POSTS = 'FETCHING_POSTS'
const FETCHING_POSTS_ERROR = 'FETCHING_POSTS_ERROR'
const FETCHING_BULK_POSTS_SUCCESS = 'FETCHING_BULK_POSTS_SUCCESS'
const FETCHING_POST_SUCCESS = 'FETCHING_POST_SUCCESS'
const ADD_POST = 'ADD_POST'
const DELETE_POST = 'DELETE_POST'
const EDIT_POST= 'EDIT_POST'

function fetchingPosts () {
  return {
    type: FETCHING_POSTS,
  }
}

function fetchingPostsError (error) {
  console.warn(error)
  return {
    type: FETCHING_POSTS_ERROR,
    error: 'Error getting Posts',
  }
}

function fetchingBulkPostSuccess (groupId, posts) {
  return {
    type: FETCHING_BULK_POSTS_SUCCESS,
    groupId,
    posts,
  }
}

export function postAndHandlePost (accessToken, groupId, data) {
  return function (dispatch) {
    postGroupPost(accessToken, groupId, data)
  }
}

export function fetchAndHandleGroupPosts (accessToken, groupId) {
  return async function (dispatch) {
    try {
      dispatch(fetchingPosts())
      const posts = await getGroupPosts(accessToken, groupId)
      dispatch(fetchingBulkPostSuccess(groupId, posts))
    } catch (error) {
      dispatch(fetchingPostsError(error))
    }
  }
}

const initialState = Map({
  isFetching: true,
  lastUpdated: 0,
  currentGroupId: '',
  error: '',
})

export default function posts (state = initialState, action) {
  switch (action.type) {
    case FETCHING_POSTS :
      return state.merge({
        isFetching: true,
      })
    case FETCHING_POSTS_ERROR :
      return Map({
        isFetching: false,
        error: action.error,
      })
    case FETCHING_BULK_POSTS_SUCCESS :
      return state.merge({
        isFetching: false,
        error: '',
        currentGroupId: action.currentGroupId,
        ...action.posts,
      })
    default:
      return state
  }
}
