import React from 'react'
import {
  makeStyles,
  Theme,
  useTheme,
  useMediaQuery,
  createStyles,
  Container,
  Box,
  Typography,
  Divider,
  Hidden,
} from '@material-ui/core'
import illustration from 'img/illustration.svg'
import figures from 'img/figures.svg'
import clsx from 'clsx'
import { CreateInvestment } from './investments/create-investment'

export const Landing = () => {
  const c = useStyles({})
  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'))

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

      <Container disableGutters={smUp}>
        <Divider className={c.divider} />
      </Container>

      <Container className={c.padding} style={{ position: 'relative' }}>
        <Box className={c.calculator}>
          <Typography variant='h2' className={c.calculatorTitle}>
            Калькулятор
          </Typography>
          <Typography className={c.calculatorSubtitle}>
            Выберите тариф для пересчета
          </Typography>
          <CreateInvestment />
        </Box>

        <Hidden smDown>
          <img src={figures} style={{ position: 'absolute', left: 20, top: '30%' }} alt=''/>
          <img
            src={figures}
            style={{
              position: 'absolute',
              left: 20,
              bottom: '20%',
              transform: 'scaleY(-1)',
            }}
            alt=''
          />
          <img
            src={figures}
            style={{
              position: 'absolute',
              right: 20,
              top: '30%',
              transform: 'scaleX(-1)',
            }}
            alt=''
          />
          <img
            src={figures}
            style={{
              position: 'absolute',
              right: 20,
              bottom: '20%',
              transform: 'scaleY(-1) scaleX(-1)',
            }}
            alt=''
          />
        </Hidden>
      </Container>
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
)
