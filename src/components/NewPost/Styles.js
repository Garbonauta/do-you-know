import styled from 'styled-components'

export const PostDiv = styled.div`
`

export const ActionsDiv = styled.div`
  flex: 1;
`

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: 'space-around';
  width: 100%;
`

export const styles = theme => ({
  newPostContainer: {
    // backgroundColor: theme.palette.primary.lightest,
    backgroundColor: 'inherit',
  },
})
