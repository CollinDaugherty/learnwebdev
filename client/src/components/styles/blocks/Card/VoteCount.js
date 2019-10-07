import styled from 'styled-components';

const VoteCount = styled.span`
  background: ${props => props.theme.color.neutral._200};
  color: ${props => props.theme.color.neutral._700};
  font-weight: 700;
  font-size: 2rem;
`;

export default VoteCount;
