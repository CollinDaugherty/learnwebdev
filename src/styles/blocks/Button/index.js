import styled from 'styled-components';

const Btn = styled.button`
  font-size: 1.5em;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borders.borderRadius};
`;

export default Btn;
