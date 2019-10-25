import styled from 'styled-components';

const Subtitle = styled.a`
  /* display: block; */
  font-size: 1.4rem;
  color: ${props => props.theme.color.secondary._300};

  @media ${props => props.theme.device.mobile} {
    font-size: 1.1rem;
  }
`;

export default Subtitle;
