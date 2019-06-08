import styled from 'styled-components';

const Form = styled.form`
  display: block;
  font-size: 1.6rem;

  /* Text Inputs */
  input:not([type='submit']):not([type='file']):not([type='radio']) {
    display: inline-block;
    border: 1px solid #dedede;
    border-radius: 3px;
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
  }
`;

export default Form;
