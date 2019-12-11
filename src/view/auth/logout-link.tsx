import React, { FC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { apolloClient } from 'store';


export const LogoutLink: FC<{
  size?: 'small' | 'medium' | 'large' | undefined;
  onClick?: () => void;
}> = ({ size = 'medium', onClick }) => {
  const { t } = useTranslation();
  const c = useStyles({});

  function handleClick() {
    if (onClick) {
      onClick();
    }

    fetch(`${process.env.REACT_APP_API_ORIGIN}/auth/destroy`, {
      credentials: 'include',
    }).finally(() => {
      apolloClient.resetStore(); // todo: to "then" block
    });
  }

  return (
    <Button size={size} variant="text" color="inherit" onClick={handleClick} className={c.root}>
      {t('Logout')}
    </Button>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      opacity: 0.8,
    },
  })
);
