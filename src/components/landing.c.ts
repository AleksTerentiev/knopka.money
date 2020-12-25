import { makeStyles, Theme, createStyles } from '@material-ui/core';

const HORIZONTAL_MODE_BREAKPOINT_PX = 1200;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    mainBlock: {
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
      },
    },
    features: {
      flex: 1.2,
      [theme.breakpoints.down('xs')]: {
        order: 1,
      },
    },
    feature: {
      '&:not(:last-child)': {
        marginBottom: 8,
      },
      fontSize: 16,
      [theme.breakpoints.up('sm')]: {
        fontWeight: 500,
        fontSize: 20,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: 24,
      },
      '&:before': {
        content: '"•"',
        color: '#2FCC88',
        fontWeight: 'bold',
        display: 'inline-block',
        width: '1em',
        marginLeft: '-1em',
      },
    },
    illustrationBlock: {
      flex: 1,
      background: '#F9F9F9',
      padding: theme.spacing(6, 3),
      display: 'flex',
      justifyContent: 'center',
    },
    illustration: {
      maxWidth: '100%',
    },
    padding: {
      paddingTop: 36,
      paddingBottom: 36,
      [theme.breakpoints.up('sm')]: {
        paddingTop: 56,
        paddingBottom: 56,
      },
      [theme.breakpoints.up('md')]: {
        paddingTop: 76,
        paddingBottom: 76,
      },
      [theme.breakpoints.up('lg')]: {
        paddingTop: 116,
        paddingBottom: 116,
      },
    },
    divider: {
      [theme.breakpoints.up('md')]: {
        height: 2,
      },
    },
    howToStartSteps: {
      marginTop: theme.spacing(3.5),
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(4.5),
      },
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(6),
      },
      [`@media(min-width: ${HORIZONTAL_MODE_BREAKPOINT_PX}px)`]: {
        marginTop: theme.spacing(7),
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        '&::after': {
          content: '""',
          background: theme.palette.divider,
          width: '80%',
          height: 2,
          top: '18%',
          left: '50%',
          position: 'absolute',
          zIndex: -1,
          transform: 'translateX(-50%)',
        },
      },
    },
    howToStartStep: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      '&:not(:last-child)': {
        marginBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
          marginBottom: theme.spacing(4.5),
        },
        [theme.breakpoints.up('md')]: {
          marginBottom: theme.spacing(6),
        },
        [`@media(min-width: ${HORIZONTAL_MODE_BREAKPOINT_PX}px)`]: {
          marginBottom: theme.spacing(0),
        },
      },
    },
    howToStartStepImg: {
      display: 'inline-flex',
      justifyContent: 'center',
      borderRadius: '50%',
      border: `1px solid ${theme.palette.divider}`,
      width: theme.spacing(6.5),
      height: theme.spacing(6.5),
      marginBottom: theme.spacing(1),
      [theme.breakpoints.up('md')]: {
        borderWidth: 2,
        width: theme.spacing(9),
        height: theme.spacing(9),
      },
      background: 'white',
    },
    howToStartStepLoginImg: {
      border: 'none',
      background: theme.palette.primary.main,
      transition: 'background .2s',
      '&:hover': {
        background: theme.palette.primary.dark,
      },
    },
    howToStartStepText: {
      opacity: 0.8,
      fontWeight: theme.typography.fontWeightMedium,
    },
    howToStartStepTextWrap: {
      [`@media(min-width: 460px) and (max-width: ${HORIZONTAL_MODE_BREAKPOINT_PX}px)`]: {
        display: 'none',
      },
    },
    calculator: {
      margin: 'auto',
      maxWidth: 544,
      borderRadius: theme.shape.borderRadius * 2.5,
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(6),
        paddingTop: theme.spacing(4.5),
        border: `1px solid ${theme.palette.divider}`,
      },
      [theme.breakpoints.up('md')]: {
        borderWidth: 2,
      },
    },
    calculatorTitle: {
      marginBottom: theme.spacing(1),
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(1.5),
      },
    },
    calculatorSubtitle: {
      marginBottom: theme.spacing(2.5),
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(4),
        fontSize: 22,
        fontWeight: 500,
      },
    },
  })
);
