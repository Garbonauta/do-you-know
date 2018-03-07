import styled from 'styled-components'

const ProfilePicture = styled.span`
    height: ${props => props.size || '1em'};
    width: ${props => props.size || '1em'};
    border-radius: 50%;
    display: block;
    background-image: url(${props => props.url || ''});
    background-size: ${props => props.size || '1em'};
`

export default ProfilePicture
