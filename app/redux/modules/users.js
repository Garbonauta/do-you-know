import { Map, fromJS } from 'immutable'

const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'

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
    default :
      return state
  }
}
