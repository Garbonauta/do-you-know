import styled from 'styled-components'
import { FlexDiv as FlexDivShared, Link as LinkShared } from 'sharedStyles'

export const FlexDiv = FlexDivShared.extend`
  justify-content: space-between;
`

export const GroupContent = styled.div`
  width: 100%;
`

export const Header = styled.h1`
  text-align: center;
`

export const SideBar = FlexDivShared.extend`
  border-left: solid 1px rgba(0, 0, 0, 0.14);
  padding: 10px;
  max-width: 220px;
  flex-direction: column;
`

export const styles = theme => ({
  list: {
    paddingBottom: '24px',
  },
  listItem: {
    padding: '5px 0',
  },
  listItemText: {
    color: 'rgba(0, 0, 0, 0.64)',
    fontSize: '0.8em',
  },
})
