import styled from 'styled-components'

export const AllContent = styled.div`
  height: 100%;
  display: grid;
  grid-template: 64px 1fr / 232px 1fr;
  grid-template-areas: 'nav nav' 'sidebar content';
`
export const ContentArea = styled.div`
  grid-area: content;
`

export const ContentContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`
