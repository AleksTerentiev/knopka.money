import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { RouteComponentProps } from '@reach/router';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { navigate } from '@reach/router';
import googleIcon from 'img/google.svg';
import { useApolloClient } from '@apollo/react-hooks';

function openSocialLoginPopup() {
  const width = 480;
  const height = 600;
  const top = window.innerHeight / 2 - height / 2;
  const left = window.innerWidth / 2 - width / 2;
  return window.open(
    `${process.env.REACT_APP_API_ORIGIN}/auth/google`,
    'auth',
    `toolbar=no, location=no, directories=no, status=no, menubar=no,
     width=${width}, height=${height}, top=${top}, left=${left}
    `
  );
}

let loginWindow: Window | null;

export const Login: React.FC<RouteComponentProps> = () => {
  const apolloClient = useApolloClient();
  const { t } = useTranslation();
  const c = useStyles({});

  useEffect(() => {
    function loginWindowMessageListener(event: MessageEvent) {
      if (event.origin !== process.env.REACT_APP_API_ORIGIN) {
        return;
      }
      const { action, success } = JSON.parse(event.data);
      if (action !== 'auth' || success !== true) {
        return;
      }
      if (loginWindow) {
        loginWindow.close();
      }
      apolloClient.resetStore();
      navigate('/');
    }

    window.addEventListener('message', loginWindowMessageListener);
    return () => {
      window.removeEventListener('message', loginWindowMessageListener);
      if (loginWindow) {
        loginWindow.close();
      }
    };
  });

  function handleLoginClick() {
    loginWindow = openSocialLoginPopup();
  }

  return (
    <Box py={2}>
      <Container>
        <Paper className={c.root}>
          <h1>{t('Log In')}</h1>
          <Button variant="outlined" color="inherit" onClick={handleLoginClick} style={{ borderColor: '#aaa' }}>
            <img src={googleIcon} className={c.icon} alt="logo" />
            {t('Log in with')} Google
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4, 4, 8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    icon: {
      height: '1rem',
      marginRight: '10px',
      marginTop: '-1px',
    },
  })
);
