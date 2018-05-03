import styled from 'styled-components'
import { List as SharedList, ListItem as SharedListItem } from 'sharedStyles'

export const Sidebar = styled.div`
  grid-area: sidebar;
  margin-right: 16px;
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

export const SubTitle = styled.span`
  flex: 1;
  display: flex;
  font-size: 13px;
  height: 32px;
  padding: 0 0 0 24px;
  align-items: center;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.54);
`
