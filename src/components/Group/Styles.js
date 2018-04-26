import styled from 'styled-components'
import { FlexDiv as FlexDivShared } from 'sharedStyles'

export const FlexDiv = FlexDivShared.extend`
  width: 100%;
  flex-wrap: wrap;
`

export const Body = FlexDivShared.extend`
  width: 100%;
`

export const Content = styled.div`
  flex: 1;
`

export const Header = styled.div`
  width: 100%;
`

export const Title = styled.span`
  flex: 1;
`

export const SideBar = FlexDivShared.extend`
  margin-left: 24px;
  flex-direction: column;
  width: 220px;
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
