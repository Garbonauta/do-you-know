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

function NewPost (
  {
    messages: {newQuestion},
    onSubmit,
    classes: {newPostContainer},
  }) {
  return (
    <PostDiv className={newPostContainer}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
          <Typography variant='subheading'>{newQuestion}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Formik
            onSubmit={async (values, {setSubmitting, setErrors}) => {
              try {
                await onSubmit(values)
                setSubmitting(false)
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
            }) =>
              (<Form onSubmit={handleSubmit}>
                <FormControl fullWidth={true} margin='normal'>
                  <Input
                    multiline={true}
                    rowsMax={5}
                    name='postText'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.question}/>
                </FormControl>
                <ActionsDiv>
                  <div>{'Image Upload'}</div>
                </ActionsDiv>
                <Button
                  variant='raised'
                  color='primary'
                  type='submit'
                  disabled={isSubmitting}>
                  {'Submit'}
                </Button>
              </Form>)}/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </PostDiv>
  )
}

NewPost.propTypes = {
  messages: PropTypes.shape({
    newQuestion: PropTypes.string.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NewPost)
