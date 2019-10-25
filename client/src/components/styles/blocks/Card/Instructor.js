import styled from 'styled-components';

const Instructor = styled.div`
  margin-top: 1rem;

  svg,
  img {
    color: ${props => props.theme.color.neutral._400};
    float: left;
    margin-right: 1rem;
    max-width: 40px;
  }

  p {
    float: left;
    font-size: 1.2rem;
    line-height: 1.1;
    font-weight: 400;
    color: ${props => props.theme.color.neutral._800};

    span {
      font-size: 1.4rem;
      font-weight: 700;
    }
  }

  @media ${props => props.theme.device.mobile} {
    svg {
      margin-right: 0.5rem;
      font-size: 2.5rem;
      max-width: 30px;
    }

    p {
      font-size: 1rem;

      span {
        font-size: 1.1rem;
      }
    }
  }
`;

export default Instructor;
