import styled from 'styled-components';

const Upvote = styled.div`
  background: ${props => props.theme.color.neutral._300};
  color: ${props => props.theme.color.neutral._700};
  border-radius: 5px 0 0 5px;
  cursor: pointer;
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease;

  &:hover {
    background: ${props => props.theme.color.secondary._300};
    svg {
      color: white;
    }
  }
`;

export default Upvote;
