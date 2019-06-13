import styled, { css } from 'styled-components';

const Btn = styled.button`
  background: ${props => props.theme.color.primary};
  color: white;
  border: 3px solid ${props => props.theme.color.primary};
  border-radius: ${props => props.theme.border.radius};
  font-size: ${props => props.theme.body.fontSize};
  font-weight: 700;
  text-align: center;
  padding: 1.5rem 2rem;
  display: inline-block;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.color.primaryDark};
    border-color: ${props => props.theme.color.primaryDark};
    color: white;
  }

  /* Secondary */
  ${props =>
    props.secondary &&
    css`
      background: ${props => props.theme.color.secondary};
      border-color: ${props => props.theme.color.secondary};

      &:hover {
        background: ${props => props.theme.color.secondaryDark};
        border-color: ${props => props.theme.color.secondaryDark};
      }
    `}
  
  /* Accent */
  ${props =>
    props.accent &&
    css`
      background: ${props => props.theme.color.accent};
      border-color: ${props => props.theme.color.accent};

      &:hover {
        background: ${props => props.theme.color.accentDark};
        border-color: ${props => props.theme.color.accentDark};
      }
    `}

  /* Outline */
  ${props =>
    props.outline &&
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
      }};

      &:hover {
        background: ${props => {
          if (props.secondary) {
            return props => props.theme.color.secondaryDark;
          } else if (props.accent) {
            return props => props.theme.color.accentDark;
          } else {
            return props => props.theme.color.primaryDark;
          }
        }};
        color: white;
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
