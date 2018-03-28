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
  font-size: 0.9em;
`
export const SideBarEntry = styled.div`
  margin-bottom: 24px;
`

export const Link = LinkShared.extend`
  margin-bottom: 5px;
`
