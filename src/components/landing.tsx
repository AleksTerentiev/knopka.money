import React from 'react';
import {
  useTheme,
  useMediaQuery,
  Container,
  Box,
  Typography,
  Divider,
  Hidden,
} from '@material-ui/core';
import { useStyles } from './landing.c';
import illustration from 'img/illustration.svg';
import figures from 'img/figures.svg';
import clsx from 'clsx';
import { CreateInvestment } from './investments/create-investment';
import howToStartStepImg1 from 'img/enter.svg';
import howToStartStepImg2 from 'img/enroll.svg';
import howToStartStepImg3 from 'img/copy.svg';
import howToStartStepImg4 from 'img/coins.svg';
import { LoginButton } from './auth/login-button';

export const Landing = () => {
  const c = useStyles();
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

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
                <img src={howToStartStepImg1} alt='step1img' />
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
              <img src={howToStartStepImg2} alt='step2img' />
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
              <img src={howToStartStepImg3} alt='step3img' />
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
              <img src={howToStartStepImg4} alt='step4img' />
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
  );
};
