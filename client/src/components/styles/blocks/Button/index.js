import styled, { css } from 'styled-components';

const Btn = styled.button`
  background: ${props => props.theme.color.primary._500};
  color: white;
  border-radius: ${props => props.theme.border.radius};
  border: 2px solid ${props => props.theme.color.primary._500};
  font-size: ${props => props.theme.body.fontSize};
  font-weight: 700;
  text-align: center;
  padding: 1.3rem 1.7rem;
  display: inline-block;
  cursor: pointer;
  transition: .2s ease;

  &:hover {
    background: ${props => props.theme.color.primary._600};
    border: 2px solid ${props => props.theme.color.primary._600};
    color: white;
  }

  /* Neutral */
  ${props =>
    props.neutral &&
    css`
      background: ${props => props.theme.color.neutral._800};
      border: 2px solid ${props => props.theme.color.neutral._800};

      &:hover {
        background: ${props => props.theme.color.neutral._900};
        border: 2px solid ${props => props.theme.color.neutral._900};
      }
    `}

  /* Secondary */
  ${props =>
    props.secondary &&
    css`
      background: ${props => props.theme.color.secondary._300};
      border: 2px solid ${props => props.theme.color.secondary._300};

      &:hover {
        background: ${props => props.theme.color.secondary._400};
        border: 2px solid ${props => props.theme.color.secondary._400};
      }
    `}
  
  /* Accent */
  ${props =>
    props.accent &&
    css`
      background: ${props => props.theme.color.accent._300};
      border: 2px solid ${props => props.theme.color.accent._300};

      &:hover {
        background: ${props => props.theme.color.accent._400};
        border: 2px solid ${props => props.theme.color.accent._400};
      }
    `}

  /* Outline */
  ${props =>
    props.outline &&
    css`
      background: inherit;
      color: ${props => {
        if (props.neutral) {
          return props => props.theme.color.neutral800;
        } else if (props.secondary) {
          return props => props.theme.color.secondary300;
        } else if (props.accent) {
          return props => props.theme.color.accent300;
        } else {
          return props => props.theme.color.primary500;
        }
      }};

      &:hover {
        background: ${props => {
          if (props.neutral) {
            return props => props.theme.color.neutral900;
          } else if (props.secondary) {
            return props => props.theme.color.secondary400;
          } else if (props.accent) {
            return props => props.theme.color.accent400;
          } else {
            return props => props.theme.color.primary600;
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
