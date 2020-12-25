import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    label: {
      color: theme.palette.text.hint,
      [theme.breakpoints.up('md')]: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    copyIcon: {
      width: 14,
      height: 14,
      [theme.breakpoints.up('sm')]: {
        width: 18,
        height: 18,
      },
      [theme.breakpoints.up('md')]: {
        width: 20,
        height: 20,
      },
    },
    textField: {
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        minWidth: 434,
      },
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(3),
        minWidth: 472,
      },
    },
    inputField: {
      borderRadius: 28,
      paddingLeft: 8,
      paddingRight: 18,
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 12,
        paddingRight: 22,
      },
      '& input': {
        textOverflow: 'ellipsis',
      },
    },
    snackbar: {
      background: theme.palette.primary.light,
    },
    socialButton: {
      display: 'inline-block',
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: '50%',
      marginRight: theme.spacing(2),
      padding: 8,
      [theme.breakpoints.up('md')]: {
        marginRight: theme.spacing(3),
        padding: 14,
      },
    },
    socialButtonIcon: {
      verticalAlign: 'middle',
      height: 17,
      width: 22,
      [theme.breakpoints.up('md')]: {
        height: 26,
        width: 26,
      },
    },
  })
);
