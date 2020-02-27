import { makeStyles, Theme, createStyles } from '@material-ui/core'

const minWidth = 360

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: theme.shape.borderRadius * 2.5,
      border: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing(2),
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridRowGap: theme.spacing(1),
      gridColumnGap: theme.spacing(2),
      [`@media(min-width: ${minWidth}px)`]: {
        padding: theme.spacing(3),
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4),
        borderWidth: 2,
        gridRowGap: theme.spacing(2),
        gridColumnGap: theme.spacing(3),
      },
    },
    label: {
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
    value: {
      fontSize: 13,
      [`@media(min-width: ${minWidth}px)`]: {
        fontSize: 14,
      },
      lineHeight: '20px',
      [theme.breakpoints.up('md')]: {
        fontSize: 16,
        lineHeight: '24px',
      },
    },
  })
)
