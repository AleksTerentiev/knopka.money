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
import howToStartStepImg1 from 'img/enter.svg'
import howToStartStepImg2 from 'img/enroll.svg'
import howToStartStepImg3 from 'img/copy.svg'
import howToStartStepImg4 from 'img/coins.svg'
import { LoginButton } from './auth/login-button'

export const Landing = () => {
  const c = useStyles()
  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <Container className={c.root} disableGutters>
      <Box className={c.mainBlock}>
        <Container className={clsx(c.features, c.padding)}>
          <Typography variant='h1' gutterBottom>
            Быстрые Инвестиции
          </Typography>
          <ul style={{ listStyle: 'none', paddingLeft: 18, marginBottom: 8 }}>
            <li className={c.feature}>Начните всего от 99р</li>
            <li className={c.feature}>100% от вложений за 7 дней</li>
            <li className={c.feature}>Моментальный вывод на карту</li>
            <li className={c.feature}>30% от каждего пришедшего</li>
            <li className={c.feature}>Анонимность ваших данных</li>
          </ul>
        </Container>
        <Box className={clsx(c.illustrationBlock, c.padding)}>
          <img className={c.illustration} src={illustration} alt='illustration' />
        </Box>
      </Box>

      <Container disableGutters={smUp}>
        <Divider className={c.divider} />
      </Container>

      <Container className={c.padding}>
        <Typography variant='h2' align='center' gutterBottom>
          Как Начать?
        </Typography>
        <Box className={c.howToStartSteps}>
          <Box className={c.howToStartStep}>
            <LoginButton>
              <Box className={clsx(c.howToStartStepImg, c.howToStartStepLoginImg)}>
                <img src={howToStartStepImg1} alt='step1img'/>
              </Box>
            </LoginButton>
            <Box>
              <Typography variant='h4' gutterBottom>
                Регистрация
              </Typography>
              <Typography className={c.howToStartStepText}>
                По телефону либо <br className={c.howToStartStepTextWrap} /> через соц.
                сеть
              </Typography>
            </Box>
          </Box>
          <Box className={c.howToStartStep}>
            <Box className={c.howToStartStepImg}>
              <img src={howToStartStepImg2} alt='step2img'/>
            </Box>
            <Box>
              <Typography variant='h4' gutterBottom>
                Пополнение
              </Typography>
              <Typography className={c.howToStartStepText}>
                MasterCard | Visa | <br className={c.howToStartStepTextWrap} /> Qiwi |
                ЯндексДеньги
              </Typography>
            </Box>
          </Box>
          <Box className={c.howToStartStep}>
            <Box className={c.howToStartStepImg}>
              <img src={howToStartStepImg3} alt='step3img'/>
            </Box>
            <Box>
              <Typography variant='h4' gutterBottom>
                Инвестиции
              </Typography>
              <Typography className={c.howToStartStepText}>
                Создайте депозит на <br className={c.howToStartStepTextWrap} /> срок от 1
                до 7 дней
              </Typography>
            </Box>
          </Box>
          <Box className={c.howToStartStep}>
            <Box className={c.howToStartStepImg}>
              <img src={howToStartStepImg4} alt='step4img'/>
            </Box>
            <Box>
              <Typography variant='h4' gutterBottom>
                Вывод Средств
              </Typography>
              <Typography className={c.howToStartStepText}>
                Выводите в касание <br className={c.howToStartStepTextWrap} /> по
                истечению срока
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>

      <Container disableGutters={smUp}>
        <Divider className={c.divider} />
      </Container>

      <Container className={c.padding} style={{ position: 'relative' }}>
        <Box className={c.calculator}>
          <Typography
            variant='h2'
            className={c.calculatorTitle}
            align={smUp ? 'center' : 'left'}
          >
            Калькулятор
          </Typography>
          <Typography className={c.calculatorSubtitle} align={smUp ? 'center' : 'left'}>
            Выберите тариф для пересчета
          </Typography>
          <CreateInvestment />
        </Box>

        <Hidden smDown>
          <img
            src={figures}
            style={{ position: 'absolute', left: 20, top: '30%' }}
            alt='img'
          />
          <img
            src={figures}
            style={{
              position: 'absolute',
              left: 20,
              bottom: '20%',
              transform: 'scaleY(-1)',
            }}
            alt='img'
          />
          <img
            src={figures}
            style={{
              position: 'absolute',
              right: 20,
              top: '30%',
              transform: 'scaleX(-1)',
            }}
            alt='img'
          />
          <img
            src={figures}
            style={{
              position: 'absolute',
              right: 20,
              bottom: '20%',
              transform: 'scaleY(-1) scaleX(-1)',
            }}
            alt='img'
          />
        </Hidden>
      </Container>
    </Container>
  )
}

const horizontalModeBreakpointPx = 1200
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
    howToStartSteps: {
      marginTop: theme.spacing(3.5),
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(4.5),
      },
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(6),
      },
      [`@media(min-width: ${horizontalModeBreakpointPx}px)`]: {
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
        [`@media(min-width: ${horizontalModeBreakpointPx}px)`]: {
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
      [`@media(min-width: 460px) and (max-width: ${horizontalModeBreakpointPx}px)`]: {
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
)
