import styled from 'styled-components';

const Btn = styled.button`
  font-size: 1.5em;
  background-color: ${props => props.theme.color.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.border.borderRadius};
`;

export default Btn;
