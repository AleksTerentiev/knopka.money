import React from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
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
import { useQuery } from '@apollo/react-hooks'
import { GET_ACCOUNT } from 'queries'
import { GetAccount } from 'gql-types/GetAccount'
import { useHistory } from 'react-router-dom'
import { Balances } from 'view/billing/balances'
import logoImg from 'img/logo.svg'
import { Navigation } from './navigation'
import { LoginButton } from 'view/auth/login-button'
import { GetAccount_account } from 'gql-types/GetAccount'
import defaultAvatarImg from 'img/avatar.svg'
import { LogoutLink } from 'view/auth/logout-link'

export function AppBar() {
  const c = useStyles({})
  const { data } = useQuery<GetAccount>(GET_ACCOUNT)
  const history = useHistory()

  return (
    <>
      <Container className={c.container} disableGutters>
        <MuiAppBar className={c.root} position='static'>
          <Toolbar disableGutters>
            <Box className={c.logo} onClick={() => history.push(data ? '/investments' : '/')}>
              <img src={logoImg} className={c.logoIcon} alt='Logo' />
              <Typography className={c.logoText}>Кнопка</Typography>
            </Box>

            {data && (
              <Hidden smDown>
                <Navigation />
              </Hidden>
            )}

            <Box ml='auto' />

            {data && (
              <Box
                onClick={() => history.push('/refill')}
                display='flex'
                alignItems='center'
              >
                <Typography>
                  <Balances className={c.balances} />
                </Typography>
              </Box>
            )}

            {data ? (
              <AppBarAccount account={data.account} />
            ) : (
              <LoginButton style={{ borderRadius: 24 }} />
            )}
          </Toolbar>
        </MuiAppBar>
      </Container>
      {data && (
        <Hidden mdUp>
          <Container
            className={c.container}
            style={{ paddingTop: 0, paddingBottom: 0 }}
            disableGutters
          >
            <Navigation />
          </Container>
        </Hidden>
      )}
    </>
  )
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.primary,
      background: '#fff',
    },
    container: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(3),
      },
      [theme.breakpoints.up('md')]: {
        borderWidth: 2,
      },
      [theme.breakpoints.up('lg')]: {
        padding: theme.spacing(4),
        paddingLeft: '0 !important',
        paddingRight: '0 !important',
      },
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        marginRight: theme.spacing(5),
      },
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
    balances: {
      marginRight: theme.spacing(1.8),
      [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacing(2),
      },
      fontWeight: 'normal',
    },
  })
)

export interface AppBarAccountProps {
  account: GetAccount_account
}

export const AppBarAccount: React.FC<AppBarAccountProps> = ({ account }) => {
  const c = useAppBarStyles({})

  const [popoverAnchorEl, setPopoverAnchorEl] = React.useState<null | HTMLElement>(null)
  const popoverIsOpen = Boolean(popoverAnchorEl)
  function handleAccountPopupOpen(event: React.MouseEvent<HTMLElement>) {
    setPopoverAnchorEl(event.currentTarget)
  }
  function handlePopupClose() {
    setPopoverAnchorEl(null)
  }

  return (
    <>
      <Avatar
        alt={account.displayName}
        src={account.picture}
        classes={{
          root: c.avatarRoot,
          img: c.avatarImg,
          colorDefault: c.avatarDefault,
          fallback: c.avatarFallback,
        }}
        onClick={handleAccountPopupOpen}
        aria-controls='account-popup'
        aria-haspopup='true'
      />
      <Popover
        id='account-popup'
        anchorEl={popoverAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        keepMounted
        open={popoverIsOpen}
        onClose={handlePopupClose}
      >
        <Box p={3}>
          <Typography align='center'>{account.displayName}</Typography>
          <Box my={2}>
            <Divider />
          </Box>
          <LogoutLink onClick={handlePopupClose} />
        </Box>
      </Popover>
    </>
  )
}

export const useAppBarStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatarRoot: {
      width: '3.5vw',
      height: '3.5vw',
      minWidth: 32,
      minHeight: 32,
      maxWidth: 48,
      maxHeight: 48,
    },
    avatarImg: {
      background: 'none',
    },
    avatarDefault: {
      background: `url(${defaultAvatarImg}) no-repeat`,
      backgroundSize: 'contain',
      color: 'transparent',
    },
    avatarFallback: {
      display: 'none',
    },
  })
)
