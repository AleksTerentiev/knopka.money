import { Theme } from '@material-ui/core'

const none: 'none' = 'none'
const nowrap: 'nowrap' = 'nowrap'

export const MuiTab = (theme: Theme) => ({
  root: {
    textTransform: none,
    whiteSpace: nowrap,
    maxWidth: 'none',
    minWidth: 'auto !important',
    opacity: '1 !important',
    fontWeight: theme.typography.fontWeightRegular,
    '&$selected, &:hover': {
      color: '#B0B7C8',
    },
    '&:first-of-type': {
      paddingLeft: 0,
    },
    fontSize: 14,
    lineHeight: '20px',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
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
})
