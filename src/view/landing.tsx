import React from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  Container,
  Box,
  Typography,
  Divider,
} from '@material-ui/core'
import illustration from 'img/illustration.svg'
import clsx from 'clsx'

export const Landing = () => {
  const c = useStyles({})

  return (
    <Container className={c.root} disableGutters>
      <Box className={c.mainBlock}>
        <Container className={clsx(c.features, c.padding)}>
          <Typography variant='h1' gutterBottom>
            Смарт Инвестиции
          </Typography>
          <ul style={{ listStyle: 'none', paddingLeft: 18, marginBottom: 8 }}>
            <li className={c.feature}>Просто, как заказать такси</li>
            <li className={c.feature}>Попробуйте с $10</li>
            <li className={c.feature}>Составьте портфель как профи</li>
            <li className={c.feature}>Зарабатывайте 20-80% годовых</li>
            <li className={c.feature}>Рекомендуйте друзьям</li>
          </ul>
        </Container>
        <Box className={clsx(c.illustrationBlock, c.padding)}>
          <img className={c.illustration} src={illustration} alt='illustration' />
        </Box>
      </Box>
      <Divider className={c.divider} />
    </Container>
  )
}

const useStyles = makeStyles((theme: Theme) =>
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
  })
)
