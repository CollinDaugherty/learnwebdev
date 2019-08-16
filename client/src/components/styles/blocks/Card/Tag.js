import styled from 'styled-components';

const Tag = styled.div`
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 700;
  color: ${props => props.theme.color.neutral._100};
  background: ${props => props.theme.color.primary._400};
  border-radius: ${props => props.theme.border.radius};
  padding: 0.1rem 1rem;
  margin-right: 1rem;
  text-transform: capitalize;
  float: right;
`;

export default Tag;
