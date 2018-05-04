import {
  List as SharedList,
  ListItem as SharedListItem,
  Paper,
} from 'sharedStyles'

export const Menu = Paper.extend`
  display: grid;
`

export const List = SharedList.extend`
  grid-template-rows: repeat(auto-fit, 48px);
  grid-auto-rows: 48px;
`

export const ListItem = SharedListItem.extend`
  cursor: pointer;
  padding: 0 16px;
  &:hover {
    background: #f1f3f4;
  }
`
