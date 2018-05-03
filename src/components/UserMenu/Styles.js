import {
  Avatar,
  List as SharedList,
  ListItem as SharedListItem,
  Paper,
} from 'sharedStyles'

export const Menu = Paper.extend`
  display: grid;
`

export const List = SharedList.extend``

export const ListItem = SharedListItem.extend`
  cursor: pointer;
  padding: 0 16px;
  &:hover {
    background: #f1f3f4;
  }
`
