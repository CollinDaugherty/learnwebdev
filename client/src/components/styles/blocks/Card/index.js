import styled from 'styled-components';

const Card = styled.div`
  background: #fff;
  margin: ${props => props.theme.spacing.margin};
  padding: ${props => props.theme.spacing.padding};
  border-radius: ${props => props.theme.border.radius};
  border: 1px solid #f2f2f2;
  box-shadow: ${props => props.theme.shadow.med};
`;

export default Card;
