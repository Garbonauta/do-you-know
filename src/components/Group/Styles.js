import styled from 'styled-components'
import { FlexDiv as FlexDivShared } from 'sharedStyles'

export const FlexDiv = FlexDivShared.extend`
  flex-wrap: wrap;
`

export const Content = styled.div`
  flex: 1;
  padding-right: 24px;
`

export const Header = styled.div`
  width: 100%;
`

export const Title = styled.span`
  flex: 1;
`

export const SideBar = FlexDivShared.extend`
  border-left: solid 1px rgba(0, 0, 0, 0.14);
  padding: 10px;
  max-width: 220px;
  flex-direction: column;
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
})