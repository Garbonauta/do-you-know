import styled from 'styled-components'
import { FlexDiv } from 'sharedStyles'

export const AllContent = styled.div`
  height: 100%;
`

export const ContentContainer = styled.div`
    max-width: 1400px;
    width: 100%;
    margin: ${props => props.open ? '10px 104px 10px 312px' : '10px 104px 10px 56px'};
    padding: 1em 0.5em;
    background-color: white;
    box-shadow: 0 -1px 0 #e0e0e0, 0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24);
`

export const FlexContent = FlexDiv
