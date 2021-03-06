import { Map, fromJS } from 'immutable'
import {
  decodeJwt,
  friendsObjectFromArray,
  groupsObjectFromArray,
} from 'helpers/utils'
import { fetchingFriendsSuccess } from './friends'
import { handleAndFetchGroups } from './groups'
import { getAuthUserProfile } from 'helpers/api'
import Auth from 'helpers/Auth'

const auth = new Auth()

const AUTH_USER = 'AUTH_USER'
const AUTH_USER_ERROR = 'AUTH_USER_ERROR'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const FETCHING_USER_ERROR = 'FETCHING_USER_ERROR'

export function authUser({ uid, accessToken, idToken, expiresAt }) {
  return {
    type: AUTH_USER,
    uid,
    accessToken,
    idToken,
    expiresAt,
  }
}

function authUserError(error) {
  console.warn(error)
  return {
    type: AUTH_USER_ERROR,
    error: 'Could Not Authorize Facebook User',
  }
}

function unAuthUser() {
  return {
    type: UNAUTH_USER,
  }
}

function fetchingUser() {
  return {
    type: FETCHING_USER,
  }
}

export function fetchingUserSuccess(
  uid,
  info,
  timestamp,
  favoriteGroup,
  groups
) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user: info,
    favoriteGroup,
    groups,
    timestamp,
  }
}

function fetchingUserFailure(error) {
  console.warn(error)
  return {
    type: FETCHING_USER_ERROR,
    error: 'There was an Error fetching the user',
  }
}

export function loginUser() {
  return auth.login()
}

async function authAction(dispatch, { uid, accessToken, idToken, expiresAt }) {
  try {
    const {
      friends,
      info,
      meta: { favoriteGroup, groups },
    } = await getAuthUserProfile(accessToken)
    dispatch(fetchingUserSuccess(uid, info, Date.now(), favoriteGroup, groups))
    dispatch(
      fetchingFriendsSuccess(friendsObjectFromArray(friends), friends.length)
    )
    dispatch(authUser({ uid, accessToken, idToken, expiresAt }))
    return dispatch(handleAndFetchGroups(accessToken, uid, groups))
  } catch (error) {
    dispatch(authUserError(error))
    throw error
  }
}

export function fetchAndHandleAuthedUser() {
  return async function(dispatch) {
    try {
      dispatch(fetchingUser())
      const {
        accessToken,
        idToken,
        expiresAt,
      } = await auth.handleAuthentication()
      const { sub: uid } = decodeJwt(accessToken)
      authAction(dispatch, { uid, accessToken, idToken, expiresAt })
    } catch (error) {
      dispatch(authUserError(error))
      throw error
    }
  }
}

export function handleAuthedUserFromBrowserCache() {
  return async function(dispatch) {
    dispatch(fetchingUser())
    if (auth.isAuthenticated()) {
      try {
        return await authAction(dispatch, auth.getAuthenticated())
      } catch (error) {
        dispatch(authUserError(error))
        throw error
      }
    }
    const error = 'User is not authenticated'
    dispatch(authUserError(error))
    return Promise.reject(error)
  }
}

export function logOut() {
  return function(dispatch) {
    auth.logout()
    return dispatch(unAuthUser())
  }
}

export function invalidAuth(error) {
  return function(dispatch) {
    dispatch(authUserError(error))
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

export function user(state = initialUserState, action) {
  switch (action.type) {
    case FETCHING_USER_SUCCESS:
      return state.merge({
        userId: action.uid,
        lastUpdated: action.timestamp,
        info: action.user,
        favoriteGroup: action.favoriteGroup,
        userGroups: action.groups,
      })
    default:
      return state
  }
}

const initialState = Map({
  isAuthed: false,
  isFetching: false,
  error: '',
  uid: '',
  accessToken: '',
  idToken: '',
  expiresAt: '',
})

export default function users(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return state.merge({
        isAuthed: true,
        uid: action.uid,
        accessToken: action.accessToken,
        idToken: action.idToken,
        expiresAt: action.expiresAt,
      })
    case AUTH_USER_ERROR:
      return state.merge({
        isFetching: false,
        isAuthed: false,
        accessToken: '',
        idToken: '',
        expiresAt: '',
        error: action.error,
      })
    case UNAUTH_USER:
      return state.merge({
        isAuthed: false,
        accessToken: '',
        idToken: '',
        expiresAt: '',
      })
    case FETCHING_USER:
      return state.merge({
        isFetching: true,
      })
    case FETCHING_USER_SUCCESS:
      return state.merge({
        isFetching: false,
        error: '',
        [action.uid]: user(state.get(action.uid), action),
      })
    case FETCHING_USER_ERROR:
      return state.merge({
        isFetching: false,
        error: action.error,
      })
    default:
      return state
  }
}
