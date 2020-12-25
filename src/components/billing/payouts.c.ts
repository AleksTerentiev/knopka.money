import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    divider: {
      display: 'none',
      [theme.breakpoints.up('lg')]: {
        marginBottom: theme.spacing(4),
        display: 'block',
      },
    },
    count: {
      color: theme.palette.grey[500],
    },
    payouts: {
      [theme.breakpoints.up('lg')]: {
        maxHeight: 620,
        overflowY: 'scroll',
      },
    },
    payout: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridTemplateRows: 'auto auto',
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        gridColumnGap: theme.spacing(3),
      },
    },
    details: {
      gridColumn: '1 / 3',
    },
    payoutMethod: {},
    comment: {
      gridColumn: '1 / 4',
    },
    commentField: {
      whiteSpace: 'normal',
      background: theme.palette.grey[100],
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(1, 2),
      marginTop: theme.spacing(1),
    },
  })
);
