import { Map } from 'immutable'

const OPEN_DIALOG = 'OPEN_DIALOG'
const CLOSE_DIALOG = 'CLOSE_DIALOG'

function openDialog(dialogType, dialogProps) {
  return {
    type: OPEN_DIALOG,
    dialogType,
    dialogProps,
  }
}

function closeDialog() {
  return {
    type: CLOSE_DIALOG,
  }
}

export function handleOpenDialog(dialogType, dialogProps) {
  return function(dispatch) {
    return dispatch(openDialog(dialogType, dialogProps))
  }
}

export function handleCloseDialog() {
  return function(dispatch) {
    return dispatch(closeDialog())
  }
}

const initialState = Map({
  dialogType: null,
  dialogProps: {},
})

export default function dialog(state = initialState, action) {
  switch (action.type) {
    case OPEN_DIALOG:
      return state.merge({
        dialogType: action.dialogType,
        dialogProps: action.dialogProps,
      })
    case CLOSE_DIALOG:
      return initialState
    default:
      return state
  }
}
