import styled from 'styled-components'
import { List as SharedList, ListItem as SharedListItem } from 'sharedStyles'

export const Sidebar = styled.div`
  grid-area: sidebar;
`

export const List = SharedList.extend``

export const ListItem = SharedListItem.extend`
  padding: 0 12px 0 24px;
  font-size: 13px;
  ${props =>
    props.selected &&
    `
      background: rgba(0, 0, 0, 0.059);
      font-weight: 700;
    `};
  cursor: ${props => (props.selected ? 'default' : 'pointer')};
  border-radius: 0 16px 16px 0;

  &:hover {
    background: ${props =>
      props.selected ? 'rgba(0, 0, 0, 0.059)' : '#f1f3f4'};
  }
`

export const Icon = styled.span`
  margin-right: 1em;
`

export const SubTitle = styled.span`
  font-size: 13px;
  padding: 0 0 0 24px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.54);
`
