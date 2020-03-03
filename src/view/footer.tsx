import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_ACCOUNT, GET_BALANCES } from 'queries'
import { GetAccount } from 'gql-types/GetAccount'
import { GetBalances } from 'gql-types/GetBalances'
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
  useMediaQuery,
  Box,
  Container,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Hidden,
  Avatar,
  Popover,
  Divider,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { Balances } from 'view/billing/balances'
import logoImg from 'img/logo.svg'
import { Navigation } from './navigation'
import { LoginButton } from 'view/auth/login-button'
import { GetAccount_account } from 'gql-types/GetAccount'
import { LogoutButton } from 'view/auth/logout-button'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { Route } from 'react-router-dom'
import _ from 'lodash'

export function Footer() {
  const { data: accountData } = useQuery<GetAccount>(GET_ACCOUNT)
  const c = useStyles({ loggedIn: !!accountData })
  const history = useHistory()
  const theme = useTheme()
  const downSm = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <Container className={c.root}>
        <Box
          className={c.logo}
          onClick={() => history.push(accountData ? '/investments' : '/')}
        >
          <img src={logoImg} className={c.logoIcon} alt='Logo' />
          <Typography className={c.logoText}>Кнопка</Typography>
        </Box>

        <Box ml='auto' />
        {accountData && (
          <Box pt={accountData && downSm ? 2 : 0}>
            <Navigation vertical={downSm} color='secondary' />
          </Box>
        )}
        {!accountData && (
          <Hidden smDown>
            <Typography color='textSecondary' variant='body2'>
              Copyright © 2020 knopka.money
            </Typography>
          </Hidden>
        )}

        <Box ml={5} mr='auto' />

        <Box pt={accountData && downSm ? 2 : 0}>
          <a href='https://www.free-kassa.ru' target='_blank'>
            <img src='https://www.free-kassa.ru/img/fk_btn/15.png' />
          </a>
        </Box>
      </Container>

      <Hidden mdUp={!accountData}>
        <Box p={3}>
          <Typography color='textSecondary' variant='body2' align='center'>
            Copyright © 2020 knopka.money
          </Typography>
        </Box>
      </Hidden>
    </>
  )
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: ({ loggedIn }: any) => ({
      display: 'flex',
      flexDirection: loggedIn ? 'column' : 'row',
      alignItems: 'flex-start',
      background: theme.palette.grey[100],
      padding: theme.spacing(3),
      borderBottom: loggedIn ? `1px solid ${theme.palette.divider}` : 'none',
      [theme.breakpoints.up('md')]: {
        borderWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
        background: '#fff',
        borderTop: `1px solid ${theme.palette.divider}`,
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: '0 !important',
        paddingRight: '0 !important',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      },
    }),
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
  })
)
