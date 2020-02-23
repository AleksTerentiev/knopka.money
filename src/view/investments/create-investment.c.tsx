import { makeStyles, Theme, createStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // maxWidth: 544,
      // border: `1px solid ${theme.palette.divider}`,
      // textAlign: 'center',
      // display: 'flex',
      // flexDirection: 'column',
    },
    form: {
      // width: '100%',
      // '@media (min-width: 400px)': {
      //   width: 280,
      //   margin: 'auto',
      // },
    },
    tariffs: {
      display: 'flex',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      borderRadius: theme.shape.borderRadius,
      marginBottom: theme.spacing(2),
      border: `1px solid ${theme.palette.primary.main}`,
      [theme.breakpoints.up('md')]: {
        borderRadius: theme.shape.borderRadius * 2,
        marginBottom: theme.spacing(3),
        borderWidth: 2,
      },
    },
    tariff: {
      cursor: 'pointer',
      position: 'relative',
      display: 'inline-block',
      flex: 1,
      '&:not(:last-child)': {
        borderRight: `1px solid ${theme.palette.primary.main}`,
        [theme.breakpoints.up('md')]: {
          borderWidth: 2,
        },
      },
    },
    tariffInput: {
      '-webkit-appearance': 'none',
      '-moz-appearance': 'none',
      appearance: 'none',
      position: 'absolute',
      width: '100%',
      height: '100%',
      margin: 0,
      zIndex: -1,
      '&:checked': {
        outline: 'none',
        background: theme.palette.primary.main,
      },
    },
    tariffImgContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(1),
      width: 40,
      height: 40,
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(1),
        width: 48,
        height: 48,
      },
      [theme.breakpoints.up('md')]: {
        width: 56,
        height: 56,
      },
    },
    tariffImg: {
      width: '40%',
      height: '40%',
    },
    tariffLabel: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(1, 2),
      whiteSpace: 'nowrap',
      fontSize: 16,
      [theme.breakpoints.up('sm')]: {
        fontSize: 20,
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(2, 3),
        fontSize: 24,
        fontWeight: 500,
      },
    },
    amountInput: {
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(3),
      },
    },
    inputField: {
      '&::placeholder': {
        opacity: 1,
      },
    },
    inputAdornment: {
      fontSize: 16,
      [theme.breakpoints.up('sm')]: {
        fontSize: 20,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: 24,
      },
    },
    result: {
      background: '#F9F9F9',
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(1.5, 2),
      marginBottom: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3),
        borderRadius: theme.shape.borderRadius * 2,
        marginBottom: theme.spacing(6),
      },
    },
    resultHeader: {
      fontSize: 12,
      fontWeight: 600,
      textTransform: 'uppercase',
      color: '#9ea4b4',
      letterSpacing: 2,
      marginBottom: theme.spacing(1),
      [theme.breakpoints.up('sm')]: {
        fontSize: 13,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: 14,
      },
    },
    resultAmount: {
      fontWeight: 700,
    },
    resultDate: {
      color: '#B0B7C8',
      fontWeight: 500,
    },
  })
)
