import { addComment } from 'helpers/api'

export const SUBMIT_COMMENT = 'SUBMIT_COMMENT'
export const SUBMIT_COMMENT_ERROR = 'SUBMIT_COMMENT_ERROR'

function submitComment(comment) {
  return {
    type: SUBMIT_COMMENT,
    postId: comment.postId,
    comment,
  }
}

function submitCommentError(error, postId) {
  console.warn(error)
  return {
    type: SUBMIT_COMMENT_ERROR,
    postId,
    error: 'Failed to submit comment',
  }
}

export function handleSubmitComment(accessToken, comment) {
  return async function(dispatch) {
    try {
      const retCom = await addComment(accessToken, comment)
      dispatch(submitComment(retCom))
    } catch (error) {
      dispatch(submitCommentError(error, comment.postId))
    }
  }
}
