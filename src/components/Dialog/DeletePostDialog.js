import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import { styles } from './Styles'

function DeletePostDialog({
  open,
  onAcceptClick,
  onClose,
  messages: { title, description, cancel, yes },
  classes: { paper },
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: paper }}
      aria-labelledby="alert-delete-post-title"
      aria-describedby="alert-delete-post-desc"
    >
      <DialogTitle id="alert-delete-post-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-delete-post-desc">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {cancel}
        </Button>
        <Button onClick={onAcceptClick} color="primary">
          {yes}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
DeletePostDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onAcceptClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  messages: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cancel: PropTypes.string.isRequired,
    yes: PropTypes.string.isRequired,
  }),
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DeletePostDialog)
