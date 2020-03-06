import { makeStyles, Theme, createStyles } from '@material-ui/core'

export const useGlobalStyles = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      display: 'grid',
      gridGap: theme.spacing(4.5),
      paddingTop: 36,
      paddingBottom: 36,
      [theme.breakpoints.up('sm')]: {
        gridGap: theme.spacing(6),
        paddingTop: 56,
        paddingBottom: 56,
      },
      [theme.breakpoints.up('md')]: {
        gridGap: theme.spacing(9),
        paddingTop: 76,
        paddingBottom: 76,
      },
      [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: 'minmax(auto, 540px) minmax(auto, 448px)',
        gridGap: '9vw',
        paddingTop: 116,
        paddingBottom: 116,
      },
      [theme.breakpoints.up('xl')]: {
        gridGap: theme.spacing(16),
      },
    },
    card: {
      padding: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4.5),
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
      },
    },
    cardDense: {
      padding: theme.spacing(2.5),
      '@media(min-width: 360px)': {
        padding: theme.spacing(2.5, 3),
      },
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(3, 3.5),
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3.5, 4),
      },
    },
    cardLabel: {
      whiteSpace: 'nowrap',
      color: theme.palette.text.secondary,
      marginBottom: 4,
      textTransform: 'uppercase',
      fontWeight: 500,
      fontSize: 10,
      letterSpacing: 1,
      lineHeight: '16px',
      [theme.breakpoints.up('md')]: {
        fontWeight: 600,
        fontSize: 12,
        letterSpacing: 2,
        lineHeight: '20px',
      },
    },
    cardValue: {
      whiteSpace: 'nowrap',
      fontSize: 13,
      lineHeight: '20px',
      [`@media(min-width: 360px)`]: {
        fontSize: 14,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: 16,
        lineHeight: '24px',
      },
    },
  })
)
