import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const useGlobalStyles = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      display: 'grid',
      gridTemplateColumns: '100%',
      gridGap: theme.spacing(5),
      paddingTop: theme.spacing(4.5),
      paddingBottom: theme.spacing(4.5),
      [theme.breakpoints.up('sm')]: {
        gridGap: theme.spacing(8),
        paddingTop: theme.spacing(7.5),
        paddingBottom: theme.spacing(7.5),
      },
      [theme.breakpoints.up('md')]: {
        gridGap: theme.spacing(10),
        paddingTop: theme.spacing(9.5),
        paddingBottom: theme.spacing(9.5),
      },
      [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: 'minmax(auto, 540px) minmax(auto, 448px)',
        gridGap: '9vw',
        paddingTop: theme.spacing(14.5),
        paddingBottom: theme.spacing(14.5),
      },
      [theme.breakpoints.up('xl')]: {
        gridGap: theme.spacing(16),
      },
    },
    cardDense: {
      padding: theme.spacing(2.5),
      marginBottom: theme.spacing(2),
      '@media(min-width: 370px)': {
        padding: theme.spacing(2.5, 3),
      },
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(3, 3.5),
        marginBottom: theme.spacing(2.5),
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3.5, 4),
        marginBottom: theme.spacing(3),
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
);
