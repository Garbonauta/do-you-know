import styled from 'styled-components'

export const EmptyWarn = styled.div`
  background-color: rgba(0, 0, 0, 0.04);
  color: rgba(0, 0, 0, 0.7);
  padding-top: 16;
`

export const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  progress: {
    display: 'block',
    margin: 'auto',
  },
})
