import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
}

body {
  background: ${props => props.theme.color.neutral100};
  font-family: ${props => props.theme.body.fontFamily};
  font-weight: ${props => props.theme.body.fontWeight};
  font-size: ${props => props.theme.body.fontSize};
  color: ${props => props.theme.body.fontColor};
  line-height: ${props => props.theme.body.lineHeight};
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1,
h2,
h3,
h4,
h5 {
  color: ${props => props.theme.heading.fontColor};
  line-height: ${props => props.theme.heading.lineHeight};
}

a, button {
  border: none;
  background: transparent
  font-size: inherit;
  cursor: pointer;
  text-decoration: none;
  color: ${props => props.theme.color.primary500};

  &:hover {
    color: ${props => props.theme.color.primary600};
  }
}

hr {
  border: 0px;
  height: 1px;
  background-color: ${props => props.theme.color.primary400};
}

`;
