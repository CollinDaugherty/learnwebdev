import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;

  /* Text Inputs */
  input:not([type='submit']):not([type='file']):not([type='radio']) {
    border: none;
    background-color: ${props => props.theme.color.neutral100};
    border-radius: ${props => props.theme.border.radius};
    padding: 1rem;
    margin-bottom: 1rem;
    width: 100%;
    line-height: 1;
    font-size: inherit;
    -webkit-appearance: none;

    &:focus {
      border-color: ${props => props.theme.color.primary400};
    }
  }

  p {
    margin: 0 auto;
  }

  fieldset {
    border: none;
    display: flex;

    div {
      background: ${props => props.theme.color.secondary300};
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
