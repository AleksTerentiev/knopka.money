import React from 'react';
import { makeStyles, Theme, createStyles, IconButton, Box } from '@material-ui/core';
import VKIcon from 'img/social/vk.svg';
import GoogleIcon from 'img/social/google.svg';
import FacebookIcon from 'img/social/facebook.svg';
import OKIcon from 'img/social/ok.svg';
import MailruIcon from 'img/social/mailru.svg';
import { AuthProvider, useAuthPopup } from 'auth';

export const AuthSocial = () => {
  const c = useStyles();
  const { loginWithPopup } = useAuthPopup();

  function handleClick(provider: AuthProvider) {
    loginWithPopup(provider);
  }

  return (
    <Box className={c.root}>
      <IconButton className={c.button} onClick={() => handleClick('vk')}>
        <img alt='VK' src={VKIcon} />
      </IconButton>
      <IconButton className={c.button} onClick={() => handleClick('google')}>
        <img alt='Google' src={GoogleIcon} />
      </IconButton>
      <IconButton className={c.button} onClick={() => handleClick('fb')}>
        <img alt='Facebook' src={FacebookIcon} />
      </IconButton>
      <IconButton className={c.button} onClick={() => handleClick('ok')}>
        <img alt='Ok.ru' src={OKIcon} />
      </IconButton>
      <IconButton className={c.button} onClick={() => handleClick('mailru')}>
        <img alt='Mail.ru' src={MailruIcon} />
      </IconButton>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    button: {
      padding: 0,
      marginBottom: theme.spacing(2),
      '&:not(:last-child)': {
        marginRight: theme.spacing(2),
      },
      [theme.breakpoints.up('sm')]: {
        marginBottom: 0,
        '&:not(:last-child)': {
          marginRight: theme.spacing(2.5),
        },
      },
    },
  })
);
