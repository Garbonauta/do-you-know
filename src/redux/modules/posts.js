import { Map, List, fromJS } from 'immutable'
import {
  getGroupPosts,
  postGroupPost,
  deletePost as apiDeletePost,
} from 'helpers/api'
import { formatPostsPayload } from 'helpers/utils'
import { SUBMIT_COMMENT, SUBMIT_COMMENT_ERROR } from './comments'

const FETCHING_POSTS = 'FETCHING_POSTS'
const FETCHING_POSTS_ERROR = 'FETCHING_POSTS_ERROR'
const FETCHING_BULK_POSTS_SUCCESS = 'FETCHING_BULK_POSTS_SUCCESS'
const FETCHING_POST_SUCCESS = 'FETCHING_POST_SUCCESS'
const CLEAR_POSTS = 'CLEAR_POSTS'
const ADD_POST = 'ADD_POST'
const ADD_POST_ERROR = 'ADD_POST_ERROR'
const DELETE_POST = 'DELETE_POST'
const DELETE_POST_ERROR = 'DELETE_POST_ERROR'
const EDIT_POST = 'EDIT_POST'

function fetchingPosts() {
  return {
    type: FETCHING_POSTS,
  }
}

function fetchingPostsError(error) {
  console.warn(error)
  return {
    type: FETCHING_POSTS_ERROR,
    error: 'Error getting Posts',
  }
}

function fetchingBulkPostSuccess(posts) {
  return {
    type: FETCHING_BULK_POSTS_SUCCESS,
    posts,
  }
}

function clearPosts() {
  return {
    type: CLEAR_POSTS,
  }
}

function addPost({ createdAt, _id, ...postInfo }) {
  return {
    type: ADD_POST,
    postId: _id,
    createdAt: new Date(createdAt).getTime(),
    ...postInfo,
  }
}

function addPostError(error) {
  console.warn(error)
  return {
    type: ADD_POST_ERROR,
    error: 'error adding post',
  }
}

function deletePost(postId) {
  return {
    type: DELETE_POST,
    postId,
  }
}

function deletePostError(error) {
  console.warn(error)
  return {
    type: ADD_POST_ERROR,
    error: 'error deleting post',
  }
}

export function postAndHandlePost(accessToken, groupId, data) {
  return async function(dispatch) {
    try {
      const post = await postGroupPost(accessToken, groupId, data)
      dispatch(addPost(post))
    } catch (error) {
      dispatch(addPostError(error))
    }
  }
}

export function handleDeletePost(accessToken, groupId, postId) {
  return async function(dispatch) {
    try {
      await apiDeletePost(accessToken, postId)
      dispatch(deletePost(postId))
    } catch (error) {
      dispatch(deletePostError(error))
    }
  }
}

export function fetchAndHandleGroupPosts({
  accessToken,
  groupId,
  clear,
  postId,
}) {
  return async function(dispatch) {
    try {
      dispatch(fetchingPosts())
      clear && dispatch(clearPosts())
      const posts = await getGroupPosts(accessToken, groupId, postId)
      return dispatch(fetchingBulkPostSuccess(formatPostsPayload(posts)))
    } catch (error) {
      dispatch(fetchingPostsError(error))
    }
  }
}

const initialPostState = Map({
  isFetching: false,
  text: '',
  owner: {},
  comments: [],
})

function post(state = initialPostState, action) {
  switch (action.type) {
    case ADD_POST:
      return state.merge({
        groupId: action.groupId,
        groupName: action.groupName,
        postId: action.postId,
        text: action.text,
        createdAt: action.createdAt,
        owner: action.owner,
      })
    case SUBMIT_COMMENT:
      return state.merge({
        comments: state.get('comments').push(action.comment),
      })
    case SUBMIT_COMMENT_ERROR:
    default:
      return state
  }
}

const initialState = Map({
  isFetching: true,
  lastUpdated: 0,
  error: '',
})

export default function posts(state = initialState, action) {
  switch (action.type) {
    case FETCHING_POSTS:
      return state.merge({
        isFetching: true,
      })
    case FETCHING_POSTS_ERROR:
      return Map({
        isFetching: false,
        error: action.error,
      })
    case FETCHING_BULK_POSTS_SUCCESS:
      return state.merge({
        isFetching: false,
        lastUpdated: Date.now,
        error: '',
        ...action.posts,
      })
    case CLEAR_POSTS:
      return Map({
        isFetching: state.get('isFetching'),
        lastUpdated: state.get('lastUpdated'),
        error: state.get('error'),
      })
    case ADD_POST:
    case SUBMIT_COMMENT:
    case SUBMIT_COMMENT_ERROR:
      return state.merge({
        [action.postId]: post(state.get(action.postId.toString()), action),
      })
    case ADD_POST_ERROR:
      return state.merge({
        error: action.error,
      })
    case DELETE_POST:
      return state.delete(action.postId.toString())
    default:
      return state.merge({
        error: action.error,
      })
  }
}
