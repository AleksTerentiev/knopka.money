import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    label: {
      color: theme.palette.grey[400],
      fontWeight: theme.typography.fontWeightMedium,
    },
    tariffs: ({ disabled }: any) => ({
      display: 'flex',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      borderRadius: theme.shape.borderRadius,
      marginBottom: theme.spacing(2),
      border: `1px solid ${
        disabled ? theme.palette.divider : theme.palette.primary.main
      }`,
      [theme.breakpoints.up('md')]: {
        borderRadius: theme.shape.borderRadius * 2,
        marginBottom: theme.spacing(3),
        borderWidth: 2,
      },
    }),
    tariff: ({ disabled }: any) => ({
      cursor: disabled ? 'default' : 'pointer',
      position: 'relative',
      display: 'inline-block',
      flex: 1,
      '&:not(:last-child)': {
        borderRight: `1px solid ${
          disabled ? theme.palette.divider : theme.palette.primary.main
        }`,
        [theme.breakpoints.up('md')]: {
          borderWidth: 2,
        },
      },
    }),
    tariffInput: ({ disabled }: any) => ({
      '-webkit-appearance': 'none',
      '-moz-appearance': 'none',
      appearance: 'none',
      borderRadius: 0,
      border: 'none',
      position: 'absolute',
      width: '100%',
      height: '100%',
      margin: 0,
      zIndex: -1,
      '&:checked': {
        outline: 'none',
      },
      transition: 'background .2s',
      '&:hover': {
        background: disabled ? 'none' : '#ffe5e7',
      },
    }),
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
    tariffLabel: ({ secondary }: any) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(1),
      whiteSpace: 'nowrap',
      fontSize: 16,
      [theme.breakpoints.up('sm')]: {
        fontSize: secondary ? 18 : 20,
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(secondary ? 1.25 : 2, 3),
        fontSize: secondary ? 22 : 24,
        fontWeight: 500,
      },
    }),
    amountInput: {
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(3),
      },
    },
    inputField: ({ secondary, disabled }: any) => ({
      '&::placeholder': {
        [secondary && 'opacity']: '0.6 !important',
        [disabled && 'opacity']: '1 !important',
      },
    }),
    inputAdornment: ({ secondary, disabled }: any) => ({
      [theme.breakpoints.up('md')]: {
        [secondary ? '' : 'fontSize']: 24,
      },
    }),
    result: ({ disabled }: any) => ({
      background: disabled ? theme.palette.grey[200] : theme.palette.grey[100],
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(1.5, 2, 1),
      marginBottom: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(2.5, 3, 2),
        borderRadius: theme.shape.borderRadius * 2,
        marginBottom: theme.spacing(6),
      },
    }),
    resultHeader: ({ disabled }: any) => ({
      fontSize: 12,
      lineHeight: '20px',
      fontWeight: 600,
      textTransform: 'uppercase',
      color: disabled ? 'white' : '#9ea4b4',
      letterSpacing: 2,
      marginBottom: theme.spacing(0.5),
      [theme.breakpoints.up('sm')]: {
        fontSize: 13,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: 14,
      },
    }),
    resultAmount: ({ disabled }: any) => ({
      [theme.breakpoints.up('md')]: {
        fontWeight: theme.typography.fontWeightBold,
      },
      color: disabled ? 'white' : theme.palette.primary.main,
    }),
    resultDate: ({ disabled }: any) => ({
      marginLeft: theme.spacing(1),
      color: disabled ? 'white' : '#B0B7C8',
      fontWeight: 500,
    }),
  })
);
