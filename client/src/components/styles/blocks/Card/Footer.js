import styled from 'styled-components';

const Footer = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  color: ${props => props.theme.color.neutral._600};
  background: ${props => props.theme.color.neutral._100};
  padding: 1.2rem 2.5rem;

  ul {
    list-style-type: none;

    li {
      display: inline;
      margin-right: 2rem;

      svg {
        color: ${props => props.theme.color.neutral._500};
      }
    }
  }
`;

export default Footer;
