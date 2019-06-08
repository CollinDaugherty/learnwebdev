import styled from 'styled-components';

const Card = styled.div`
  background: #fff;
  margin: 2rem;
  padding: 2.5rem;
  border-radius: ${props => props.theme.borders.borderRadius};
  border: 1px solid #f2f2f2;
  box-shadow: ${props => props.theme.boxShadow};
`;

export default Card;
