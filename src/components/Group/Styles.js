import styled from 'styled-components'
import {
  FlexDiv,
  Paper as PaperShared,
  Link as LinkShared,
  List as ListShared,
  ListItem as ListItemShared,
} from 'sharedStyles'
import { headerColor } from 'sharedStyles/vars'

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

export const HeaderContainer = FlexDiv.extend`
  align-items: center;
`

export const Title = styled.h2`
  flex: 1;
`

export const IconButton = styled.div`
  cursor: pointer;
`
export const SideBar = styled.div`
  ${props => {
    console.log(props)
    return !props.sideBarVisible
      ? 'display: none;'
      : 'display: block;  grid-area: sidebar;'
  }};
`

export const Paper = PaperShared.extend`
  padding: 1em;
`

export const List = ListShared.extend`
  grid-template-rows: repeat(auto-fit, 1.3em);
  grid-auto-rows: 1.3em;

  &:not(:last-child) {
    margin-bottom: 2em;
  }
`

export const ListItem = ListItemShared.extend`
  font-size: 0.8em;
  padding-top: 0.1em;
  overflow: hidden;
`

export const Subheader = ListItemShared.extend`
  font-size: 0.7em;
  color: ${headerColor};
  font-weight: 700;
`

export const Link = LinkShared.extend`
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  min-width: 0;
`
