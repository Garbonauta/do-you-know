import styled from 'styled-components'

export const Nav = styled.nav`
  grid-area: nav;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  background: white;
`

export const NavGrid = styled.div`
  display: grid;
  height: 100%;
  margin: 0 16px;
  grid-gap: 16px;
  grid-template-columns: [navStart iconStart] 24px [iconEnd headerBegin] 1fr [headerEnd avatarStart] 48px [avatarEnd navEnd];
  align-items: center;
`

export const NavIcon = styled.div`
  grid-column: iconStart / iconEnd;
`

export const Title = styled.div`
  grid-column: headerBegin / headerEnd;
`

export const AvatarMenu = styled.div`
  grid-column: avatarStart / avatarEnd;
`

export const Header = styled.h2`
  display: inline-block;
  font-size: 1.2em;
  font-weight: 400;
  cursor: pointer;
`
