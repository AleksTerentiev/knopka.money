import { createMuiTheme, responsiveFontSizes, darken, lighten } from '@material-ui/core/styles';

import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    // md: 960,
    md: 980,
    // lg: 1280,
    lg: 1180,
    xl: 1920,
  },
};

const typography = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: 15,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
};

const palette = {
  primary: blue,
  secondary: pink,
  link: 'rgba(62, 153, 191, 1)',
  text: {
    primary: 'rgba(0, 10, 20, 0.9)',
    secondary: 'rgba(0, 10, 20, 0.6)',
    disabled: 'rgba(0, 10, 20, 0.4)',
    hint: 'rgba(0, 10, 20, 0.4)',
  },
  background: {
    paper: '#fff',
    default: '#fff',
    // default: '#F0F2F7',
  },
};

const shape = {
  borderRadius: 4,
};

let theme = createMuiTheme({
  breakpoints,
  typography,
  palette,
  shape,
});

theme.props = {
  MuiAppBar: {
    elevation: 0,
  },
  MuiButtonBase: {
    disableRipple: true,
  },
  MuiLink: {
    underline: 'none',
  },
  MuiPaper: {
    elevation: 0,
  },
};

theme.overrides = {
  MuiButton: {
    root: {
      textTransform: 'none',
    },
  },
  MuiTabs: {
    root: {
      color: lighten(theme.palette.text.primary, 0.1),
    },
    indicator: {
      height: '1px',
      backgroundColor: lighten(theme.palette.text.primary, 0.4),
    },
  },
  MuiTab: {
    root: {
      textTransform: 'none',
      '&$selected, &:hover': {
        color: darken(theme.palette.text.primary, 0.1),
        fontWeight: 500,
      },
      minWidth: 'auto !important',
    },
  },
};

theme = responsiveFontSizes(theme);

export { theme };
