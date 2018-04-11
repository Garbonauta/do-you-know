import { Map, List, fromJS } from 'immutable'
import { getGroupPosts, postGroupPost, deleteGroupPost } from 'helpers/api'
import { formatPostsPayload } from 'helpers/utils'

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

function addPost(groupId, { postId, text, createdAt, owner }) {
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
  return async function(dispatch, state) {
    try {
      const post = await postGroupPost(accessToken, groupId, data)
      const user = state()
        .users.get(post.owner)
        .get('info')
        .toJS()
      dispatch(
        addPost(groupId, {
          postId: post._id,
          text: post.text,
          createdAt: post.createdAt,
          owner: {
            userId: post.owner,
            fullName: user.fullName,
            link: user.link,
            small: user.pictures.small,
          },
        })
      )
    } catch (error) {
      dispatch(addPostError(error))
    }
  }
}

export function handleDeletePost(accessToken, groupId, postId) {
  return async function(dispatch) {
    try {
      await deleteGroupPost(accessToken, groupId, postId)
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
  text: '',
  owner: {},
})

function post(state = initialPostState, action) {
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
      return state.merge({
        [action.postId]: post(state.get(action.postId), action),
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
