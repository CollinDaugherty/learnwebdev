import styled from 'styled-components';

const Title = styled.h2`
  @media ${props => props.theme.device.mobile} {
    font-size: 1.5rem;
  }
`;

export default Title;
