import styled from 'styled-components';

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

  p {
    text-align: center;
    margin-top: 1.2rem;
  }

  .radio-group {
    border: none;
    margin: 0 0.5rem 1.5rem 0;
    display: flex;
    flex-direction: row;

    span {
      flex: 2;
      font-weight: bold;
    }

    div {
      flex: 3;
    }

    label {
      background: ${props => props.theme.color.primary._200};
      font-weight: 400;
      margin-right: 0.7rem;
      padding: 0.5rem 1rem;
      border-radius: ${props => props.theme.border.radius};
      cursor: pointer;
    }

    label:nth-of-type(3) {
      margin-left: 1.2rem;
    }
  }
`;

export default Form;
