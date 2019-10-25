import styled from 'styled-components';

const Tag = styled.div`
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 700;
  color: ${props => props.theme.color.primary._600};
  background: ${props => props.theme.color.primary._200};
  border-radius: ${props => props.theme.border.radius};
  padding: 0.1rem 1rem;
  margin-right: 1rem;
  text-transform: capitalize;
  float: right;

  @media ${props => props.theme.device.mobile} {
    font-size: 1rem;
    background: none;
    color: ${props => props.theme.color.neutral._600};
    font-style: italic;
    padding: 0rem;
    margin-right: 0.4rem;

    &:not(:first-of-type):after {
      content: ',';
    }
  }
`;

export default Tag;
