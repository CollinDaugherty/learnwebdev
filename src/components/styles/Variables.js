import { lighten, darken } from 'polished';

//=================================================
// COLORS
//=================================================

export const color = {
  bg: '#fff',
  alternateBg: '#F5F9FB',
  darkBg: '#24272E',

  primary: '#0366EE',
  secondary: '#29de7d',
  accent: '#EE266C',

  highlight: '#ff0',
  error: '#D33C40'
};

color.primaryHover = `${darken(0.1, `${color.primary}`)};`;
color.secondaryHover = `${darken(0.1, `${color.secondary}`)};`;
color.accentHover = `${darken(0.1, `${color.accent}`)};`;

//=================================================
// TYPOGRAPHY
//=================================================

export const body = {
  fontFamily: 'sans-serif',
  fontWeight: '400',
  fontSize: '1.6rem',
  fontColor: '#404040',
  lineHeight: '1.7'
};

export const heading = {
  fontFamily: `${body.fontFamily}`,
  fontWeight: '700',
  fontColor: `${body.fontColor}`,
  lineHeight: '1.2'
};

//=================================================
// SPACING
//=================================================

export const spacing = {
  padding: '2.5rem',
  margin: '2rem'
};

//=================================================
// BORDERS
//=================================================

export const border = {
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: '#dedede',
  borderRadius: '5px'
};

border.border = `
  ${border.borderWidth} 
  ${border.borderStyle} 
  ${border.borderColor}`;

export const boxShadow = `0 5px 10px rgba(154, 160, 185, 0.05),
0 15px 40px rgba(166, 173, 201, 0.2)`;
