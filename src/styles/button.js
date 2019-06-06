import styled from 'styled-components';

const Button = styled.button`
  font-size: 1.5em;
  background-color: ${props => props.theme.primary};
  color: white;
`;

export default Button;
