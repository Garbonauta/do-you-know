import styled from 'styled-components'

const Button = styled.button`
    padding: 15px;
    border-radius: 5px;
    border-width: 0;
    font-size: ${props => props.fontSize || '1em'};
    cursor: pointer;

    &:hover {
     opacity: 0.9;
    }
`

export default Button
