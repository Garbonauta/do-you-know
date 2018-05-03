import styled from 'styled-components'

export const Container = styled.div`
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
`

export const Image = styled.img`
  border-radius: 50%;
  ${props => {
    switch (props.size.toUpperCase()) {
      case 'SMALL':
        return `width: 32px; 
                height: 32px;`
      case 'MEDIUM':
      default:
        return `width: 40px; 
                height: 40px;`
    }
  }};
`
