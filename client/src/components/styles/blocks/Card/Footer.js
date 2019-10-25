import styled from 'styled-components';

const Footer = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  color: ${props => props.theme.color.neutral._600};
  background: ${props => props.theme.color.neutral._100};
  padding: 1.2rem 2rem;

  ul {
    list-style-type: none;

    .link {
      color: ${props => props.theme.color.neutral._700};

      &:hover {
        color: ${props => props.theme.color.neutral._800};
        cursor: pointer;
      }
    }

    li {
      display: inline;
      margin-right: 1.5rem;

      @media ${props => props.theme.device.mobile} {
        margin-right: 1rem;
      }

      a {
        color: ${props => props.theme.color.neutral._700};

        &:hover {
          color: ${props => props.theme.color.neutral._800};
        }
      }

      span {
        color: ${props => props.theme.color.neutral._700};
      }

      svg {
        color: ${props => props.theme.color.neutral._500};
      }

      .extra {
        display: inline;
        @media ${props => props.theme.device.mobile} {
          display: none;
        }
      }
    }
  }

  @media ${props => props.theme.device.mobile} {
    font-size: 1.1rem;
    padding: 0.5rem 1rem;

    svg {
      font-size: 1.4rem;
      position: relative;
      top: 1px;
    }
  }
`;

export default Footer;
