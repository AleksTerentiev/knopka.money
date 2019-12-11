import React, { useEffect } from 'react';
import './auth.scss';
import { RouteComponentProps } from '@reach/router';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button'
import { navigate } from '@reach/router';
import googleIcon from 'img/google.svg';
import { apolloClient } from 'store';

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

let authWindow: Window | null;

export const Auth: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation();

  useEffect(() => {
    function authWindowMessageListener(event: MessageEvent) {
      if (event.origin !== process.env.REACT_APP_API_ORIGIN) {
        return;
      }
      const { action, success } = JSON.parse(event.data);
      if (action !== 'auth' || success !== true) {
        return;
      }
      if (authWindow) {
        authWindow.close();
      }
      apolloClient.resetStore();
      navigate('/');
    }

    window.addEventListener('message', authWindowMessageListener);
    return () => {
      window.removeEventListener('message', authWindowMessageListener);
      if (authWindow) {
        authWindow.close();
      }
    };
  }, []);

  function handleLogInClick() {
    authWindow = openSocialLoginPopup();
  }

  return (
    <div className="Auth">
      <h1>{t('Log In')}</h1>
      <Button variant='outlined' color='inherit' onClick={handleLogInClick}>
        <img src={googleIcon} className="Auth-social_icon" alt="logo" />
        {t('Log in with')} Google
      </Button>
    </div>
  );
};
