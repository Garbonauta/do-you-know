import {Map, fromJS} from 'immutable'
import auth from 'helpers/auth'
import {formatUserInfo} from 'helpers/utils'
import {getUserFromFacebookAPI} from 'helpers/api'

const AUTH_USER = 'AUTH_USER'
const AUTH_USER_ERROR = 'AUTH_USER_ERROR'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const FETCHING_USER_ERROR = 'FETCHING_USER_ERROR'

export function authUser (uid) {
  return {
    type: AUTH_USER,
    uid,
  }
}

function authUserError (error) {
  console.warn(error)
  return {
    type: AUTH_USER_ERROR,
    error: 'Could Not Authorize Facebook User',
  }
}

function unAuthUser () {
  return {
    type: UNAUTH_USER,
  }
}

function fetchingUser () {
  return {
    type: FETCHING_USER,
  }
}

export function fetchingUserSuccess (uid, user, timestamp) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp,
  }
}

function fetchingUserFailure (error) {
  console.warn(error)
  return {
    type: FETCHING_USER_ERROR,
    error: 'There was an Error fetching the user',
  }
}

export function fetchAndHandleAuthedUser () {
  return function (dispatch) {
    dispatch(fetchingUser())
    return auth()
      .then(({authResponse: {userID}}) => dispatch(authUser(userID)))
      .catch((error) => dispatch(authUserError(error)))
      .then(() => getUserFromFacebookAPI('me'))
      .catch((error) => dispatch(authUserError(error)))
      .then(me => {
        const userInfo = formatUserInfo(me)
        return dispatch(fetchingUserSuccess(me.id, userInfo, Date.now()))
      })
  }
}

const initialUserState = Map({
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    link: '',
    avatar: '',
  },
})

export function user (state = initialUserState, action) {
  switch (action.type) {
    case FETCHING_USER_SUCCESS :
      return state.merge({
        lastUpdated: action.timestamp,
        info: action.user,
      })
    default:
      return state
  }
}

const initialState = Map({
  isAuthed: false,
  isFetching: true,
  error: '',
  authedId: '',
})

export default function users (state = initialState, action) {
  switch (action.type) {
    case AUTH_USER :
      return state.merge({
        isAuthed: true,
        authedId: action.uid,
      })
    case AUTH_USER_ERROR :
      return state.merge({
        isFetching: false,
        isAuthed: false,
        authedId: '',
      })
    case UNAUTH_USER :
      return state.merge({
        isAuthed: false,
        autehdId: '',
      })
    case FETCHING_USER :
      return state.merge({
        isFetching: true,
      })
    case FETCHING_USER_SUCCESS :
      return state.merge({
        isFetching: false,
        error: '',
        [action.uid]: user(state.get(action.uid), action),
      })
    case FETCHING_USER_ERROR :
      return state.merge({
        isFetching: false,
        error: action.error,
      })
    default :
      return state
  }
}
