import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar'
import Input, { InputLabel } from 'material-ui/Input'
import { CommentDiv, TextDiv, styles } from './Styles'

function NewComment({
  avatar,
  messages,
  handleChange,
  keyPressAction,
  classes: { img, txtRoot },
}) {
  return (
    <CommentDiv>
      <Avatar src={avatar} className={img} />
      <TextDiv>
        <Input
          multiline={true}
          rowsMax={5}
          name="commentText"
          fullWidth={true}
          placeholder={messages.placeholder}
          classes={{ root: txtRoot }}
          onChange={handleChange}
          onKeyPress={keyPressAction}
        />
      </TextDiv>
    </CommentDiv>
  )
}

NewComment.propTypes = {
  avatar: PropTypes.string.isRequired,
  messages: PropTypes.shape({
    placeholder: PropTypes.string.isRequired,
  }),
  handleChange: PropTypes.func.isRequired,
  keyPressAction: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NewComment)
