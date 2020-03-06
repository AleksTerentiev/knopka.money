import { createMuiTheme } from '@material-ui/core'
import defaultAvatarImg from 'img/avatar.svg'

const breakpoints = {
  values: {
    xs: 0,
    sm: 500,
    md: 876,
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
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
}

const palette = {
  background: {
    default: '#fff',
    paper: '#fff',
  },
  primary: {
    light: 'rgb(247, 129, 136)',
    main: 'rgb(251, 111, 120)',
    dark: 'rgb(249, 84, 94)',
    contrastText: '#fff',
  },
  secondary: {
    light: 'rgb(20, 39, 84)',
    main: 'rgb(24, 40, 78)',
    dark: 'rgb(34, 50, 86)',
    contrastText: '#fff',
  },
  error: {
    light: '#e57373',
    main: '#f44336',
    dark: '#d32f2f',
    contrastText: '#fff',
  },
  text: {
    primary: 'rgb(24, 40, 78)',
    secondary: '#8790A4',
    disabled: '#EDEFF3',
    hint: '#B0B7C8',
  },
  divider: '#EDEFF3',
  grey: {
    50: '#fafafa',
    100: '#F9F9F9',
    200: '#EDEFF3',
    300: '#e0e0e0',
    400: '#a3a9b8',
    500: '#a1a1af',
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
  MuiCard: {
    elevation: 0,
  },
}

theme.overrides = {
  MuiTypography: {
    h1: {
      fontWeight: theme.typography.fontWeightBold,
      fontSize: 32,
      [theme.breakpoints.up('sm')]: {
        fontSize: 40,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: 64,
      },
    },
    h2: {
      fontWeight: theme.typography.fontWeightBold,
      fontSize: 28,
      lineHeight: '40px',
      '&$gutterBottom': {
        marginBottom: theme.spacing(2),
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: 32,
        lineHeight: '50px',
        '&$gutterBottom': {
          marginBottom: theme.spacing(3),
        },
      },
      [theme.breakpoints.up('md')]: {
        fontSize: 48,
        lineHeight: '60px',
        '&$gutterBottom': {
          marginBottom: theme.spacing(4.5),
        },
      },
    },
    h3: {
      fontWeight: theme.typography.fontWeightBold,
      fontSize: 20,
      lineHeight: '28px',
      '&$gutterBottom': {
        marginBottom: theme.spacing(1.5),
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: 24,
        lineHeight: '36px',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: 32,
        lineHeight: '48px',
        '&$gutterBottom': {
          marginBottom: theme.spacing(2),
        },
      },
    },
    body1: {
      fontSize: 16,
      lineHeight: '24px',
      '&$gutterBottom': {
        marginBottom: theme.spacing(1.5),
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: 18,
        lineHeight: '28px',
      },
      [`@media (min-width:${breakpoints.values.md}px)`]: {
        fontSize: 22,
        lineHeight: '32px',
        '&$gutterBottom': {
          marginBottom: theme.spacing(2),
        },
      },
    },
    body2: {
      fontSize: 16,
      lineHeight: '24px',
      [theme.breakpoints.up('sm')]: {
        fontSize: 18,
        lineHeight: '26px',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: 20,
        lineHeight: '28px',
      },
    },
    caption: {
      fontSize: 14,
      [theme.breakpoints.up('sm')]: {
        fontSize: 16,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: 20,
      },
    },
  },

  MuiCard: {
    root: {
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius * 2,
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        marginBottom: theme.spacing(2.5),
      },
      [theme.breakpoints.up('md')]: {
        borderRadius: theme.shape.borderRadius * 2.5,
        borderWidth: 2,
        marginBottom: theme.spacing(3),
      },
    },
  },

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

  MuiAvatar: {
    colorDefault: {
      background: `url(${defaultAvatarImg}) no-repeat`,
      backgroundSize: 'contain',
      color: 'transparent',
    },
    fallback: {
      display: 'none',
    },
  },

  MuiButton: {
    root: {
      textTransform: 'none',
      boxShadow: 'none !important',
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '20px',
      padding: theme.spacing(0.8, 2),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(1, 2.5),
        fontSize: 18,
        lineHeight: '24px',
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(1.2, 3),
        fontSize: 20,
        lineHeight: '28px',
        borderRadius: theme.shape.borderRadius * 2,
      },
    },
    containedSizeSmall: {
      padding: '6px 12px',
      fontSize: 14,
      lineHeight: '20px',
      borderRadius: theme.shape.borderRadius,
      [theme.breakpoints.up('sm')]: {
        padding: '7px 14px',
        fontSize: 15,
        lineHeight: '22px',
      },
      [theme.breakpoints.up('md')]: {
        padding: '8px 16px',
        fontSize: 16,
        lineHeight: '24px',
      },
    },
    containedSizeLarge: {
      padding: theme.spacing(1, 2),
      fontSize: 16,
      lineHeight: '24px',
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(1.25, 2.5),
        fontSize: 18,
        lineHeight: '28px',
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(1.5, 3),
        fontWeight: 500,
        fontSize: 22,
        lineHeight: '32px',
      },
    },
    contained: {
      '&$disabled': {
        backgroundColor: theme.palette.grey[200],
        color: 'white',
      },
    },
  },

  MuiTabs: {
    root: {
      '&$vertical': {
        '& .MuiTab-root': {
          paddingLeft: 0,
          '&:not(:last-of-type)': {
            borderBottom: `1px solid ${theme.palette.divider}`,
            [theme.breakpoints.up('md')]: {
              borderWidth: 2,
            },
          },
        },
        '& .MuiTab-wrapper': {
          alignItems: 'flex-start',
        },
        padding: 0,
      },
    },
    indicator: {
      display: 'none',
    },
  },

  MuiTab: {
    root: {
      maxWidth: 'none',
      whiteSpace: 'nowrap',
      textTransform: 'none',
      minWidth: 'auto !important',
      opacity: '1 !important',
      fontWeight: 400,
      [theme.breakpoints.down('xs')]: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
      },
      '&$selected, &:hover': {
        color: '#B0B7C8',
      },
      '&:first-of-type': {
        paddingLeft: 0,
      },
      fontSize: 14,
      lineHeight: '20px',
      [theme.breakpoints.up('sm')]: {
        fontSize: 16,
        lineHeight: '22px',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: 18,
        lineHeight: '24px',
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        fontSize: 20,
        lineHeight: '28px',
      },
    },
  },

  MuiInputBase: {
    root: {
      '&$disabled': {
        color: theme.palette.text.disabled,
      },
      '& input::placeholder': {
        opacity: 1,
      },
    },
  },

  MuiFormControl: {
    root: {
      marginTop: '0 !important',
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
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        fontSize: 22,
        borderRadius: theme.shape.borderRadius * 2,
      },
      '&$focused .MuiOutlinedInput-notchedOutline': {
        borderWidth: 1,
        [theme.breakpoints.up('md')]: {
          borderWidth: 2,
        },
      },
      '&$disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.divider,
      },
    },
    input: {
      paddingTop: 15,
      paddingBottom: 15,
      [theme.breakpoints.up('sm')]: {
        paddingTop: 17,
        paddingBottom: 17,
      },
      [theme.breakpoints.up('md')]: {
        paddingTop: 19,
        paddingBottom: 19,
      },
    },
    inputMarginDense: {
      marginTop: 0,
      paddingTop: 11,
      paddingBottom: 11,
      [theme.breakpoints.up('sm')]: {
        paddingTop: 13,
        paddingBottom: 13,
      },
      [theme.breakpoints.up('md')]: {
        paddingTop: 15,
        paddingBottom: 15,
      },
    },
    adornedEnd: {
      paddingRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        paddingRight: theme.spacing(3),
      },
    },
    notchedOutline: {
      borderColor: theme.palette.divider,
      [theme.breakpoints.up('md')]: {
        borderWidth: 2,
      },
    },
  },

  MuiDivider: {
    root: {
      height: 1,
      [theme.breakpoints.up('md')]: {
        height: 2,
      },
    },
  },

  MuiDialog: {
    paper: {
      borderRadius: theme.shape.borderRadius * 2.5,
      padding: theme.spacing(2.5, 3, 3),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(5, 6, 6),
      },
    },
  },
}

export { theme }
