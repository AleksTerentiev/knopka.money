import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { navigate, Link } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';
import { AccountData, GET_ACCOUNT } from 'store/account';
import Box from '@material-ui/core/Box';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import { Balance } from 'view/balance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import MuiLink from '@material-ui/core/Link';
import Logo from 'img/logo.png';
import { Navigation } from './navigation';
import { AppBarAccount } from './app-bar-account';
import { BurgerMenu } from './burger-menu';

export const AppBar: React.FC = () => {
  const c = useStyles({});
  const { t } = useTranslation();
  const { data } = useQuery<AccountData>(GET_ACCOUNT);

  return (
    <MuiAppBar className={c.root} position="static" color="inherit">
      <Container>
        <Toolbar className={c.toolbar} disableGutters>
          <div className={c.brand} onClick={() => navigate('/')}>
            <img alt="Logo" src={Logo} className={c.logo} />
            <Typography variant="h6" className={c.title}>
              Neurobet
            </Typography>
          </div>

          <Hidden smDown>
            <Navigation />
          </Hidden>

          <Box ml="auto" />

          {data && (
            <Box>
              <FontAwesomeIcon icon={faWallet} className={c.icon} />
              <Balance className={c.balance} />
            </Box>
          )}

          {data ? (
            <Hidden xsDown>
              <Box ml={1}>
                <AppBarAccount displayName={data.account.displayName} />
              </Box>
            </Hidden>
          ) : (
            <MuiLink component={Link} to="/auth">
              {t('Login')}
            </MuiLink>
          )}

          <Hidden mdUp>
            <Box ml={1}>
              <BurgerMenu />
            </Box>
          </Hidden>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: '#464646',
      background: '#fff',
      borderBottom: '1px solid rgba(0,0,0,0.0975)',
      overflowX: 'scroll',
    },
    toolbar: {},
    brand: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      marginRight: theme.spacing(3),
    },
    logo: {
      height: '1.8rem',
      marginRight: theme.spacing(1),
    },
    title: {},
    balance: {
      marginRight: theme.spacing(1.5),
      fontWeight: 500,
    },
    icon: {
      fontSize: '0.9rem',
      marginRight: 6,
      color: '#737373',
    },
  })
);
