import styled, { css } from 'styled-components';

const Btn = styled.button`
  background: ${props => props.theme.color.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.border.borderRadius};
  font-size: ${props => props.theme.body.fontSize};
  font-weight: 700;
  text-align: center;
  padding: 1.5rem 2rem;
  display: inline-block;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.color.primaryHover};
  }

  ${props =>
    props.secondary &&
    css`
      background: ${props => props.theme.color.secondary};

      &:hover {
        background: ${props => props.theme.color.secondaryHover};
      }
    `}

  ${props =>
    props.accent &&
    css`
      background: ${props => props.theme.color.accent};

      &:hover {
        background: ${props => props.theme.color.accentHover};
      }
    `}

    ${props =>
      props.full &&
      css`
        width: 100%;
      `}
`;

export default Btn;
