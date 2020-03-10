import { createMuiTheme } from '@material-ui/core'
import { MuiAvatar } from './avatar'
import { MuiButton } from './button'
import { MuiCard } from './card'
import { MuiContainer } from './container'
import { MuiDialog } from './dialog'
import { MuiDivider } from './divider'
import { MuiFormControl } from './form-control'
import { MuiInputBase } from './input-base'
import { MuiOutlinedInput } from './outlined-input'
import { MuiTab } from './tab'
import { MuiTabs } from './tabs'
import { MuiToolbar } from './toolbar'
import { MuiTypography } from './typography'

export const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 876,
      lg: 1120,
      xl: 1920,
    },
  },

  typography: {
    fontFamily: '"IBM Plex Mono", Helvetica, Arial, sans-serif, -apple-system',
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },

  palette: {
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
  },

  shape: {
    borderRadius: 8,
  },

  props: {
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
  },
})

theme.overrides = {
  MuiAvatar: MuiAvatar(theme),
  MuiButton: MuiButton(theme),
  MuiCard: MuiCard(theme),
  MuiContainer: MuiContainer(theme),
  MuiDialog: MuiDialog(theme),
  MuiDivider: MuiDivider(theme),
  MuiFormControl: MuiFormControl(theme),
  MuiInputBase: MuiInputBase(theme),
  MuiOutlinedInput: MuiOutlinedInput(theme),
  MuiTab: MuiTab(theme),
  MuiTabs: MuiTabs(theme),
  MuiToolbar: MuiToolbar(theme),
  MuiTypography: MuiTypography(theme),
}
