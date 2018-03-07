import { Map, fromJS } from 'immutable'
import { decodeJwt, friendsObjectFromArray } from 'helpers/utils'
import { fetchingFriendsSuccess } from './friends'
import { getAuthUserProfile } from 'helpers/api'
import Auth from 'helpers/Auth'

const auth = new Auth()

const AUTH_USER = 'AUTH_USER'
const AUTH_USER_ERROR = 'AUTH_USER_ERROR'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const FETCHING_USER_ERROR = 'FETCHING_USER_ERROR'

export function authUser ({uid, accessToken, idToken, expiresAt}) {
  return {
    type: AUTH_USER,
    uid,
    accessToken,
    idToken,
    expiresAt,
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

export function loginUser () {
  return auth.login()
}

export function fetchAndHandleAuthedUser () {
  return async function (dispatch) {
    try {
      dispatch(fetchingUser())
      const {accessToken, idToken, expiresAt} = await auth.handleAuthentication()
      const {sub: uid} = decodeJwt(accessToken)
      const {friends, ...user} = await getAuthUserProfile(accessToken)
      dispatch(fetchingUserSuccess(uid, user, Date.now()))
      dispatch(fetchingFriendsSuccess(friendsObjectFromArray(friends), friends.length))
      return dispatch(authUser({uid, accessToken, idToken, expiresAt}))
    } catch (error) {
      return dispatch(authUserError(error))
    }
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
  uid: '',
  accessToken: '',
  idToken: '',
  expiresAt: '',
})

export default function users (state = initialState, action) {
  switch (action.type) {
    case AUTH_USER :
      return state.merge({
        isAuthed: true,
        uid: action.uid,
        accessToken: action.accessToken,
        idToken: action.idToken,
        expiresAt: action.expiresAt,
      })
    case AUTH_USER_ERROR :
      return state.merge({
        isFetching: false,
        isAuthed: false,
        accessToken: '',
        idToken: '',
        expiresAt: '',
        error: action.error,
      })
    case UNAUTH_USER :
      return state.merge({
        isAuthed: false,
        accessToken: '',
        idToken: '',
        expiresAt: '',
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
