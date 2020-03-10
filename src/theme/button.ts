import { Theme } from '@material-ui/core'

const none: 'none' = 'none'

export const MuiButton = (theme: Theme) => ({
  root: {
    textTransform: none,
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
})
