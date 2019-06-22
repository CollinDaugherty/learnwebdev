import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;

  /* Text Inputs */
  input:not([type='submit']):not([type='file']):not([type='radio']) {
    border: ${props => props.theme.border.border};
    border-radius: ${props => props.theme.border.radius};
    padding: 1rem;
    outline: none;
    margin-bottom: 1rem;
    width: 100%;
    line-height: 1;
    font-size: inherit;
    -webkit-appearance: none;

    &:focus {
      border-color: ${props => props.theme.color.primaryLight};
    }
  }

  p {
    margin: 0 auto;
  }

  fieldset {
    border: none;
    display: flex;

    div {
      background: ${props => props.theme.color.secondary};
      color: white;
      margin: 0.5rem;
      padding: 0.5rem 1.2rem;
      border-radius: ${props => props.theme.border.radius};

      label {
        margin-left: 0.8rem;
      }
    }
  }
`;

export default Form;
