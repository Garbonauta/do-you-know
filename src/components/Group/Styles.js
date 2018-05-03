import styled from 'styled-components'
import { FlexDiv as FlexDivShared } from 'sharedStyles'

export const GroupGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template: 64px 1fr / 1fr 220px;
  grid-template-areas: 'header header' 'content sidebar';
  grid-gap: 1em;
`

export const Content = styled.div`
  grid-area: ${props => (props.sideBarVisible ? 'content' : '2 / 1/ -1/ -1')};
`

export const Posts = styled.div`
  max-width: 800px;
`

export const Header = styled.div`
  grid-area: header;
`

export const Title = styled.span`
  flex: 1;
`

export const SideBar = styled.div`
  ${props => {
    console.log(props)
    return !props.sideBarVisible
      ? 'display: none;'
      : 'display: block;  grid-area: sidebar;'
  }};
`

export const sideBarStyles = theme => ({
  list: {
    marginBottom: '32px',
  },
  listItem: {
    padding: '5px 0 0 0 ',
  },
  listItemText: {
    color: 'rgba(0, 0, 0, 0.64)',
    fontSize: '0.8em',
  },
  paperRoot: theme.mixins.gutters({
    padding: theme.spacing.unit * 3,
  }),
})
