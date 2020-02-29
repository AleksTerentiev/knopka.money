import { makeStyles, Theme, createStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      gridGap: theme.spacing(5),
      [theme.breakpoints.up('sm')]: {
        gridGap: theme.spacing(8),
      },
      [theme.breakpoints.up('md')]: {
        gridGap: theme.spacing(10),
      },
      [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: 'minmax(auto, 540px) minmax(auto, 448px)',
        gridGap: '9vw',
      },
      [theme.breakpoints.up('xl')]: {
        gridGap: theme.spacing(16),
      },
    },
    header: {
      marginBottom: theme.spacing(1),
      '@media(max-width: 345px)': {
        fontSize: 25,
      },
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(1.5),
      },
    },
    profit: {
      position: 'relative',
      right: 7,
      background: '#18284E',
      color: '#5EE1AC',
      padding: '2px 4px',
      [theme.breakpoints.up('md')]: {
        padding: '0 12px 2px 8px',
      },
    },
    subtitle: {
      marginBottom: theme.spacing(2.5),
      '@media(max-width: 356px)': {
        fontSize: 15,
      },
      '@media(max-width: 336px)': {
        fontSize: 14,
      },
      [theme.breakpoints.up('sm')]: {
        marginBottom: theme.spacing(4),
      },
      [theme.breakpoints.up('md')]: {
        fontWeight: theme.typography.fontWeightMedium,
        marginBottom: theme.spacing(6),
      },
    },
    tabs: {
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(0.5),
      },
    },
    tabsContent: {
      [theme.breakpoints.up('lg')]: {
        maxHeight: 440,
        overflowY: 'scroll',
      },
    },
    divider: {
      marginTop: theme.spacing(0),
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(1),
      },
    },
  })
)
