import styled, { css } from 'styled-components';

const Btn = styled.button`
  background: ${props => props.theme.color.primary};
  color: white;
  border: 3px solid ${props => props.theme.color.primary};
  border-radius: ${props => props.theme.border.borderRadius};
  font-size: ${props => props.theme.body.fontSize};
  font-weight: 700;
  text-align: center;
  padding: 1.5rem 2rem;
  display: inline-block;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.color.primaryHover};
    border-color: ${props => props.theme.color.primaryHover};
  }

  ${props =>
    props.secondary &&
    css`
      background: ${props => props.theme.color.secondary};
      border-color: ${props => props.theme.color.secondary};

      &:hover {
        background: ${props => props.theme.color.secondaryHover};
        border-color: ${props => props.theme.color.secondaryHover};
      }
    `}

  ${props =>
    props.accent &&
    css`
      background: ${props => props.theme.color.accent};
      border-color: ${props => props.theme.color.accent};

      &:hover {
        background: ${props => props.theme.color.accentHover};
        border-color: ${props => props.theme.color.accentHover};
      }
    `}

  ${props =>
    props.clear &&
    css`
      background: transparent;
      color: ${props => {
        if (props.secondary) {
          return props => props.theme.color.secondary;
        } else if (props.accent) {
          return props => props.theme.color.accent;
        } else {
          return props => props.theme.color.primary;
        }
      }}

      &:hover {
        background: transparent;
        color: ${props => {
          if (props.secondary) {
            return props => props.theme.color.secondaryHover;
          } else if (props.accent) {
            return props => props.theme.color.accentHover;
          } else {
            return props => props.theme.color.primaryHover;
          }
        }}
      }
    `}

  ${props =>
    props.full &&
    css`
      width: 100%;
    `}

  ${props =>
    props.round &&
    css`
      border-radius: 40px;
    `}
  
  ${props =>
    props.square &&
    css`
      border-radius: 0;
    `}
`;

export default Btn;
