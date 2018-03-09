import styled from 'styled-components'
import { FlexDiv } from 'sharedStyles'

export const AllContent = styled.div`
  height: 100%;
`

export const ContentContainer = styled.div`
    max-width: 900px;
    margin: ${props => props.open ? '0 104px 0 312px' : '0 auto'};
`

export const FlexContent = FlexDiv
