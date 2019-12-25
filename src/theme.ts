import { createMuiTheme, responsiveFontSizes, darken, lighten } from '@material-ui/core/styles';

import blueColor from '@material-ui/core/colors/blue';

const breakpoints = {
  values: {
    xs: 0,
    sm: 500,
    md: 986,
    lg: 1160,
    xl: 1920,
  },
};

const typography = {
  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  fontSize: 15,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
};

const palette = {
  background: {
    default: '#fff',
    paper: '#fff',
  },
  primary: blueColor,
  secondary: {
    light: 'rgba(100, 188, 120, 0.8)',
    main: 'rgb(100, 190, 120)',
    dark: 'rgb(80, 170, 100)',
    contrastText: '#fff',
  },
  error: {
    light: '#e57373',
    main: '#f44336',
    dark: '#d32f2f',
    contrastText: '#fff',
  },
  text: {
    primary: 'rgba(19, 19, 56, 1)',
    secondary: 'rgba(19, 19, 56, 0.6)',
    disabled: 'rgba(19, 19, 56, 0.4)',
    hint: 'rgba(19, 19, 56, 0.4)',
  },
  divider: 'rgba(0, 0, 0, 0.07)',
  grey: {
    50: '#fafafa',
    100: '#f9f9f9',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    A100: '#d5d5d5',
    A200: '#aaaaaa',
    A400: '#303030',
    A700: '#616161',
  },
};

const shape = {
  borderRadius: 0,
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
