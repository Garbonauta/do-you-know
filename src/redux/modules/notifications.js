import { Map } from 'immutable'
import { addListener } from './listeners'
import { listenNotifications } from 'helpers/api'

const SETTING_NOTIFICATION_LISTENER = 'SETTING_NOTIFICATION_LISTENER'
const SETTING_NOTIFICATION_LISTENER_ERROR =
  'SETTING_NOTIFICATION_LISTENER_ERROR'

function settingNotificationListener() {
  return {
    type: SETTING_NOTIFICATION_LISTENER,
  }
}

function settingNotificationListenerError(error) {
  console.warn(error)
  return {
    type: SETTING_NOTIFICATION_LISTENER_ERROR,
    error: 'Unable to set notification listener',
  }
}

export function fetchAndHandleNotifications() {
  return async function(dispatch, getState) {
    const { listeners, users } = getState()

    dispatch(settingNotificationListener())
    try {
      await listenNotifications({
        accessToken: users.get('accessToken'),
        userId: users.get('uid'),
        handler: (update, flags) => console.log('update', update),
      })
      dispatch(addListener('notifications'))
    } catch (error) {
      dispatch(settingNotificationListenerError(error))
    }
  }
}

const initialState = new Map({
  isFetching: true,
  error: '',
})

export default function notifications(state = initialState, action) {
  switch (action.type) {
    case SETTING_NOTIFICATION_LISTENER:
      return state.merge({
        isFetching: true,
      })
    case SETTING_NOTIFICATION_LISTENER_ERROR:
      return state.merge({
        isFetching: false,
        error: action.error,
      })
    default:
      return state
  }
}
