import styled from 'styled-components'

export const AllContent = styled.div`
  height: 100%;
  display: grid;
  grid-template: 64px 1fr / ${props => (!props.open ? '64px' : '232px')} 1fr;
  grid-template-areas: 'nav nav' 'sidebar content';
`
export const ContentArea = styled.div`
  grid-area: content;
  margin-left: 1em;
  z-index: 0;
`

export const ContentContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`
