import { Map, fromJS } from 'immutable'
import auth from 'helpers/auth'
import { formatUserInfo } from 'helpers/utils'

const AUTH_USER = 'AUTH_USER'
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

//TODO - figure how to auth again
export function fetchAndHandleAuthedUser () {
  return function (dispatch) {
    dispatch(fetchingUser())
    return auth().then(({user, credential}) => {
      const [userData] = user.providerData
      const userInfo = formatUserInfo(
        {
          name: userData.displayName,
          avatar: userData.photoURL,
          uid: user.uid,
        })
      return dispatch(fetchingUserSuccess(user.uid, userInfo, Date.now()))
    })
      // .then(({user}) => saveUser(user))
      .then((user) => dispatch(authUser(user.uid, user.accessToken)))
      .catch((error) => dispatch(fetchingUserFailure(error)))
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
