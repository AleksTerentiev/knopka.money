import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_ACCOUNT } from 'queries'
import { GetAccount } from 'gql-types/GetAccount'
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
  useMediaQuery,
  Box,
  Container,
  Typography,
  Divider,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import logoImg from 'img/logo.svg'
import { Navigation } from './navigation'
import _ from 'lodash'
import freeKassaImg from 'img/free-kassa.svg'
import clsx from 'clsx'

export function Footer() {
  const { data: accountData } = useQuery<GetAccount>(GET_ACCOUNT)
  const history = useHistory()
  const theme = useTheme()
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'))
  const c = useStyles({ isLoggedIn: !!accountData })

  const FreeKassaBanner = () => (
    <a href='https://www.free-kassa.ru' target='_blank'>
      <img src={freeKassaImg} />
    </a>
  )

  return (
    <>
      <Container className={clsx(c.container, c.top)}>
        <Box className={c.logo} onClick={() => history.push('/')}>
          <img src={logoImg} className={c.logoIcon} alt='Logo' />
          <Typography className={c.logoText}>Кнопка</Typography>
        </Box>

        {accountData && (
          <Box className={c.navigation}>
            <Navigation color='secondary' vertical={xsDown} />
          </Box>
        )}

        {accountData && <FreeKassaBanner />}
      </Container>

      <Container className={c.container} style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Divider />
      </Container>

      <Container className={clsx(c.container, c.bot)}>
        <Typography color='textSecondary' variant='body2' className={c.copyright}>
          Copyright © 2020 knopka.money
        </Typography>

        {!accountData && <FreeKassaBanner />}
      </Container>
    </>
  )
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        background: theme.palette.grey[100],
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: '0 !important',
        paddingRight: '0 !important',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      },
    },
    top: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      borderTop: `1px solid ${theme.palette.divider}`,
      [theme.breakpoints.up('md')]: {
        borderWidth: 2,
      },
    },
    navigation: {
      marginRight: theme.spacing(-2),
      ['@media (max-width: 740px)']: {
        order: 1,
        width: '100%',
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(3),
        paddingTop: theme.spacing(3),
      },
      [theme.breakpoints.down('xs')]: {
        paddingTop: 0,
      },
    },
    bot: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: ({ isLoggedIn }: any) => (isLoggedIn ? 'center' : 'space-between'),
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    },
    logoIcon: {
      width: '3.5vw',
      minWidth: 32,
      maxWidth: 48,
      marginRight: theme.spacing(1.2),
    },
    logoText: {
      fontWeight: 'bold',
      fontSize: 14,
      [theme.breakpoints.up('sm')]: {
        fontSize: 18,
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: 22,
      },
    },
    copyright: {
      [theme.breakpoints.down('xs')]: {
        fontSize: 15,
      },
    },
  })
)
