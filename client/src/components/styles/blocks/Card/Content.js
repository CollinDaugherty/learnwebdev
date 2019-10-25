import styled from 'styled-components';

const Content = styled.div`
  padding: 2.5rem;

  @media ${props => props.theme.device.mobile} {
    padding: 1rem;
    line-height: 1;
  }
`;

export default Content;
