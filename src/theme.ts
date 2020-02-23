import {
  createMuiTheme,
  // responsiveFontSizes,
  // darken,
  // lighten,
} from '@material-ui/core/styles'

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1120,
    xl: 1920,
  },
}

const typography = {
  fontFamily: '"IBM Plex Mono", Helvetica, Arial, sans-serif',
  fontSize: 16,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  button: {
    fontWeight: 400,
    fontSize: 16,
    [`@media (min-width:${breakpoints.values.sm}px)`]: {
      fontSize: 18,
    },
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      fontWeight: 500,
      fontSize: 22,
    },
  },
  h1: {
    fontWeight: 700,
    fontSize: 32,
    [`@media (min-width:${breakpoints.values.sm}px)`]: {
      fontSize: 40,
    },
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      fontSize: 64,
    },
  },
  h2: {
    fontWeight: 700,
    fontSize: 28,
    [`@media (min-width:${breakpoints.values.sm}px)`]: {
      fontSize: 32,
    },
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      fontSize: 48,
    },
  },
  h3: {
    fontSize: 20,
    [`@media (min-width:${breakpoints.values.sm}px)`]: {
      fontSize: 24,
    },
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      fontSize: 32,
    },
  },
  body1: {
    fontSize: 16,
    [`@media (min-width:${breakpoints.values.sm}px)`]: {
      fontSize: 18,
    },
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      fontSize: 22,
    },
  },
  body2: {
    fontSize: 16,
    [`@media (min-width:${breakpoints.values.sm}px)`]: {
      fontSize: 18,
    },
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      fontSize: 20,
    },
  },
}

const palette = {
  background: {
    default: '#fff',
    paper: '#fff',
  },
  primary: {
    light: 'rgba(247, 129, 136)',
    main: 'rgba(251, 111, 120)',
    dark: 'rgba(249, 84, 94)',
    contrastText: '#fff',
  },
  secondary: {
    light: 'rgba(20, 39, 84)',
    main: 'rgba(24, 40, 78)',
    dark: 'rgba(34, 50, 86)',
    contrastText: '#fff',
  },
  error: {
    light: '#e57373',
    main: '#f44336',
    dark: '#d32f2f',
    contrastText: '#fff',
  },
  text: {
    primary: 'rgba(24, 40, 78, 1)',
    secondary: 'rgba(24, 40, 78, 0.6)',
    disabled: 'rgba(24, 40, 78, 0.4)',
    hint: 'rgba(24, 40, 78, 0.4)',
  },
  divider: '#EDEFF3',
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
}

const shape = {
  borderRadius: 8,
}

let theme = createMuiTheme({
  breakpoints,
  typography,
  palette,
  shape,
})

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
}

theme.overrides = {
  MuiToolbar: {
    root: {
      minHeight: 'auto !important',
    },
  },
  MuiContainer: {
    root: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
      },
      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8),
      },
      [`@media (min-width:${breakpoints.values.lg + theme.spacing(6)}px)`]: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  },
  MuiPaper: {
    rounded: {
      borderRadius: theme.shape.borderRadius * 2.5,
    },
  },
  MuiButton: {
    root: {
      textTransform: 'none',
      boxShadow: 'none !important',
    },
    containedSizeLarge: {
      padding: theme.spacing(1.5, 3),
    },
  },
  MuiTabs: {
    root: {
      color: theme.palette.primary.main,
    },
  },
  MuiTab: {
    root: {
      textTransform: 'none',
      minWidth: 'auto !important',
      opacity: '1 !important',
      fontWeight: 400,
      '&$selected, &:hover': {
        color: '#B0B7C8',
      },
      fontSize: 14,
      [theme.breakpoints.up('sm')]: {
        fontSize: 16,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: 18,
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: 20,
      },
    },
  },
  MuiOutlinedInput: {
    root: {
      fontSize: 16,
      borderRadius: theme.shape.borderRadius,
      fontWeight: 500,
      [theme.breakpoints.up('sm')]: {
        fontSize: 20,
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(0, 1),
        fontSize: 22,
        borderRadius: theme.shape.borderRadius * 2,
      },
    },
    adornedEnd: {
      paddingRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        paddingRight: theme.spacing(3),
      },
    },
    notchedOutline: {
      borderColor: '#EDEFF3',
      [theme.breakpoints.up('md')]: {
        borderWidth: 2,
      },
    },
  },
}

// theme = responsiveFontSizes(theme);

export { theme }
