import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;

  /* Text Inputs */
  input:not([type='submit']):not([type='file']):not([type='radio']) {
    border: ${props => props.theme.borders.border};
    border-radius: ${props => props.theme.borders.borderRadius};
    padding: 1rem;
    outline: none;
    margin-bottom: 1rem;
    width: 100%;
    max-width: 100%;
    line-height: 1;
    font-size: inherit;
  }

  fieldset {
    border: none;
    display: flex;

    div {
      background: red;
      margin: 0.5rem;
      padding: 0.5rem 1.2rem;
      border-radius: ${props => props.theme.borders.borderRadius};

      label {
        margin-left: 0.8rem;
      }
    }
  }
`;

export default Form;
