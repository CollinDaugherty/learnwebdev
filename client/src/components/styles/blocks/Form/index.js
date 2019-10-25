import styled, { css } from 'styled-components';

const Form = styled.form`
  /* Text Inputs */
  input:not([type='submit']):not([type='file']):not([type='radio']) {
    border: none;
    background-color: ${props => props.theme.color.neutral._100};
    border-radius: ${props => props.theme.border.radius};
    padding: 1rem;
    margin-bottom: 1.7rem;
    width: 100%;
    line-height: 1;
    font-size: inherit;
    -webkit-appearance: none;

    &:focus {
      color: ${props => props.theme.color.primary._700};
    }
  }

  textarea {
    background: white;
    border: 1px solid ${props => props.theme.color.neutral._200};
    border-radius: ${props => props.theme.border.radius};
    padding: 1.5rem;
    width: 100%;
    line-height: 1;
    font-size: inherit;
    font-family: inherit;
    -webkit-appearance: none;
  }

  p {
    text-align: center;
    margin-top: 1.2rem;
  }

  .radio-group {
    border: none;
    margin: 0 0.5rem 1.5rem 0;
    display: flex;
    flex-direction: row;

    @media ${props => props.theme.device.mobile} {
      font-size: 1.2rem;
    }

    span {
      flex: 2;
      font-weight: bold;

      @media ${props => props.theme.device.mobile} {
        flex: 1;
      }
    }

    div {
      flex: 3;

      /* input {
      opacity: 0;
      width: 0px;
      z-index -1;
    } */

      label {
        border: 2px solid ${props => props.theme.color.primary._200};
        background: props.color;
        border-radius: ${props => props.theme.border.radius};
        font-weight: 400;
        margin-right: 0.7rem;
        padding: 0.5rem 1rem;
        border-radius: ${props => props.theme.border.radius};
        cursor: pointer;

        &:hover {
          background: ${props => props.theme.color.primary._200};
        }

        @media ${props => props.theme.device.mobile} {
          padding: 0 0.5rem;
          margin: 0.1rem;
        }
      }

      label ~ input:checked {
        background: ${props => props.theme.color.primary._200};
      }

      label:nth-of-type(3) {
        margin-left: 1.2rem;
      }
    }
  }

  ${props =>
    props.white &&
    css`
      input:not([type='submit']):not([type='file']):not([type='radio']) {
        background: white;
      }
    `}
`;

export default Form;
