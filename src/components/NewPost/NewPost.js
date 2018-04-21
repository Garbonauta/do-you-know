import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import { Formik } from 'formik'
import { FormControl } from 'material-ui/Form'
import Input, { InputLabel } from 'material-ui/Input'
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import Button from 'material-ui/Button'
import { PostDiv, ActionsDiv, Form, styles } from './Styles'

function NewPost({
  open,
  messages: { newQuestion },
  groupId,
  initialFormValue,
  toggleOpen,
  closeAction,
  onSubmit,
  classes: { newPostContainer },
}) {
  return (
    <PostDiv className={newPostContainer}>
      <ExpansionPanel expanded={open}>
        <ExpansionPanelSummary
          onClick={toggleOpen}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography variant="subheading">{newQuestion}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Formik
            initialValues={initialFormValue}
            onSubmit={async (
              values,
              { setSubmitting, setErrors, resetForm }
            ) => {
              try {
                await onSubmit(groupId, values)
                setSubmitting(false)
                closeAction()
                resetForm(initialFormValue)
              } catch (error) {
                setSubmitting(false)
                setErrors(error)
              }
            }}
            render={({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <FormControl fullWidth={true} margin="normal">
                  <Input
                    multiline={true}
                    rowsMax={5}
                    name="postText"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.postText}
                  />
                </FormControl>
                <ActionsDiv>
                  <div>{'Image Upload'}</div>
                </ActionsDiv>
                <Button
                  variant="raised"
                  color="primary"
                  type="submit"
                  name="submitPost"
                  disabled={isSubmitting}
                >
                  {'Submit'}
                </Button>
              </Form>
            )}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </PostDiv>
  )
}

NewPost.propTypes = {
  open: PropTypes.bool.isRequired,
  messages: PropTypes.shape({
    newQuestion: PropTypes.string.isRequired,
  }),
  groupId: PropTypes.number.isRequired,
  initialFormValue: PropTypes.object.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  closeAction: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NewPost)
