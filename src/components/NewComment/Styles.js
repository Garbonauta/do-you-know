import styled from 'styled-components'
import { FlexDiv } from 'sharedStyles'

export const CommentDiv = FlexDiv.extend``

export const TextDiv = styled.div`
  flex: 1;
  padding-left: 8px;
`

export const styles = theme => ({
  img: {
    width: '32px',
    height: '32px',
  },
  txtRoot: {
    fontSize: '0.875em',
  },
})
