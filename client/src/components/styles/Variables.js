//=================================================
// COLORS
//=================================================

export const color = {
  primary: {
    _100: 'HSL(232,100%,97%)',
    _200: 'HSL(223,66%,90%)',
    _300: 'HSL(223,71%,76%)',
    _400: 'HSL(228,64%,67%)',
    _500: 'HSL(235,71%,65%)',
    _600: 'HSL(230,52%,53%)',
    _700: 'HSL(230,52%,42%)',
    _800: 'HSL(231,57%,34%)',
    _900: 'HSL(230,56%,27%)'
  },

  secondary: {
    _100: 'HSL(111,87%,97%)',
    _200: 'HSL(110,81%,90%)',
    _300: 'HSL(153,60%,53%)',
    _400: 'HSL(162,93%,34%)',
    _500: 'HSL(169,100%,25%)'
  },

  accent: {
    _100: 'HSL(307,100%,92%)',
    _200: 'HSL(324,82%,80%)',
    _300: 'HSL(326,70%,65%)',
    _400: 'HSL(311,45%,50%)',
    _500: 'HSL(306,48%,36%)'
  },

  neutral: {
    _100: 'HSL(180,8%,97%)',
    _200: 'HSL(213,22%,90%)',
    _300: 'HSL(214,24%,87%)',
    _400: 'HSL(212,17%,83%)',
    _500: 'HSL(211,24%,74%)',
    _600: 'HSL(217,17%,63%)',
    _700: 'HSL(216,11%,49%)',
    _800: 'HSL(214,16%,30%)',
    _900: 'HSL(213,24%,16%)'
  },

  danger: {
    _100: 'HSL(0,88%,93%)',
    _200: 'HSL(0,80%,85%)',
    _300: 'HSL(0,60%,53%)',
    _400: 'HSL(7,93%,34%)',
    _500: 'HSL(0,100%,22%)'
  },

  warning: {
    _100: 'HSL(50,100%,90%)',
    _200: 'HSL(50,100%,80%)',
    _300: 'HSL(50,100%,53%)',
    _400: 'HSL(42,100%,45%)',
    _500: 'HSL(33,100%,38%)'
  }
};

//=================================================
// TYPOGRAPHY
//=================================================

export const body = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontWeight: '400',
  fontSize: '1.6rem',
  fontColor: `${color.neutral._800}`,
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
  width: '1px',
  style: 'solid',
  color: '#dedede',
  radius: '5px'
};

border.border = `
  ${border.width}
  ${border.style}
  ${border.color}`;

//=================================================
// SHADOWS
//=================================================

export const shadow = {
  low: `0 1px 3px rgba(154, 160, 185, 0.05),
        0 1px 2px rgba(166, 173, 201, 0.2)`,

  medLow: `0 3px 6px rgba(154, 160, 185, 0.05),
           0 2px 4px rgba(166, 173, 201, 0.2)`,

  med: `0 10px 20px rgba(154, 160, 185, 0.05),
        0 3px 6px rgba(166, 173, 201, 0.2)`,

  medHigh: `0 15px 25px rgba(154, 160, 185, 0.05),
            0 5px 10px rgba(166, 173, 201, 0.2)`,

  high: `0 20px 45px rgba(154, 160, 185, 0.05),
         0 10px 20px rgba(166, 173, 201, 0.2)`
};

//=================================================
// BREAKPOINTS
//=================================================

export const device = {
  mobile: '(max-width: 415px)',
  tablet: '(max-width: 850px)',
  laptop: '(max-width: 1024px)'
};
