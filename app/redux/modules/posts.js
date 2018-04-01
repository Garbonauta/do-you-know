import { Map, List, fromJS } from 'immutable'
import { getGroupPosts, postGroupPost } from 'helpers/api'
import { formatPostsPayload } from 'helpers/utils'

const FETCHING_POSTS = 'FETCHING_POSTS'
const FETCHING_POSTS_ERROR = 'FETCHING_POSTS_ERROR'
const FETCHING_BULK_POSTS_SUCCESS = 'FETCHING_BULK_POSTS_SUCCESS'
const FETCHING_POST_SUCCESS = 'FETCHING_POST_SUCCESS'
const ADD_POST = 'ADD_POST'
const ADD_POST_ERROR = 'ADD_POST_ERROR'
const DELETE_POST = 'DELETE_POST'
const DELETE_POST_ERROR = 'DELETE_POST_ERROR'
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

function fetchingBulkPostSuccess (posts) {
  return {
    type: FETCHING_BULK_POSTS_SUCCESS,
    posts,
  }
}

function addPost (groupId, {postId, text, createdAt, owner}) {
  const createdDate = Date.parse(createdAt)
  return {
    type: ADD_POST,
    groupId,
    postId,
    text,
    createdAt: createdDate,
    owner,
  }
}

function addPostError (error) {
  console.warn(error)
  return {
    type: ADD_POST_ERROR,
    error: 'error adding post',
  }
}

export function postAndHandlePost (accessToken, groupId, data) {
  return async function (dispatch, state) {
    try {
      const post = await postGroupPost(accessToken, groupId, data)
      const user = state().users.get(post.owner).get('info').toJS()
      dispatch(addPost(groupId, {
        postId: post._id,
        text: post.text,
        createdAt: post.createdAt,
        owner: {
          userId: post.owner,
          fullName: user.fullName,
          link: user.link,
          small: user.pictures.small,
        },
      }))
    } catch (error) {
      dispatch()
    }
  }
}

export function handleDeletePost (accessToken, groupId, postId) {

}

export function fetchAndHandleGroupPosts (accessToken, groupId) {
  return async function (dispatch) {
    try {
      dispatch(fetchingPosts())
      const posts = await getGroupPosts(accessToken, groupId)
      dispatch(fetchingBulkPostSuccess(formatPostsPayload(posts)))
    } catch (error) {
      dispatch(fetchingPostsError(error))
    }
  }
}

const initialPostState = Map({
  groupId: '',
  postId: '',
  text: '',
  owner: {},
})

function post (state = initialPostState, action) {
  switch (action.type) {
    case ADD_POST:
      return state.merge({
        groupId: action.groupId,
        postId: action.postId,
        text: action.text,
        createdAt: action.createdAt,
        owner: action.owner,
      })
    default:
      return state
  }
}

const initialState = Map({
  isFetching: true,
  lastUpdated: 0,
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
      return Map({
        isFetching: false,
        lastUpdated: Date.now,
        error: '',
        ...action.posts,
      })
    case ADD_POST:
      return state.merge({
        [action.postId]: post(state.get(action.postId), action),
      })
    case ADD_POST_ERROR:
      return state.merge({
        error: action.error,
      })
    default:
      return state
  }
}
