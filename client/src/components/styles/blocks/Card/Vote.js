import styled, { css } from 'styled-components';

const Vote = styled.button`
  background: ${props => props.theme.color.neutral._200};
  color: ${props => props.theme.color.neutral._700};
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease;
  font-size: 2.5rem;

  @media ${props => props.theme.device.mobile} {
    font-size: 2rem;
  }

  ${props =>
    props.upvote &&
    css`
      border-radius: 5px 0 0 0;

      &:hover {
        background: ${props => props.theme.color.secondary._300};
        &:before {
          color: white;
        }
      }

      &:before {
        font-family: 'icomoon';
        content: '\f062';
      }
    `}

  ${props =>
    props.upvoted &&
    css`
      &:before {
        color: ${props => props.theme.color.secondary._300};
      }
    `}

  ${props =>
    props.downvote &&
    css`
      border-radius: 0 0 0 5px;

      &:hover {
        background: ${props => props.theme.color.primary._400};
        &:before {
          color: white;
        }
      }

      &:before {
        font-family: 'icomoon';
        content: '\f063';
      }
    `}

  ${props =>
    props.downvoted &&
    css`
      &:before {
        color: ${props => props.theme.color.primary._400};
      }
    `}
`;

export default Vote;
