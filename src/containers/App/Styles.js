import styled from 'styled-components'

export const AllContent = styled.div`
  display: flex;
  height: 100%;
`

export const ContentArea = styled.div`
  width: 100%;
`

export const ContentContainer = styled.div`
  max-width: 1100px;
  margin: ${props => (props.open ? '10px 104px 10px 312px' : '10px auto')};
  padding: 1em 0.5em;
`

export const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
  },
  toolbar: theme.mixins.toolbar,
})
