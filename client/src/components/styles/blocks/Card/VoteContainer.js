import styled from 'styled-components';

const VoteContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 4;
  display: flex;
  flex-direction: column;
  text-align: center;

  span {
    background: ${props => props.theme.color.neutral._300};
    color: ${props => props.theme.color.neutral._700};
    font-weight: 700;
    font-size: 2rem
    z-index: 10;
  }
`;

export default VoteContainer;
