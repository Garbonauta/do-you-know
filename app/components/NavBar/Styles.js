import styled from 'styled-components'

export const Header = styled.div`
  flex: 1;
`

export const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    display: 'inline-block',
    cursor: 'pointer',
  },
})
