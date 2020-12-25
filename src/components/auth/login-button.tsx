import React, { FC, useState, ReactNode } from 'react';
import { Box, Button, ButtonProps, Typography } from '@material-ui/core';
import { Modal } from 'components/modal';
import { AuthSocial } from 'components/auth/auth-social';
import { useAuthPopup } from 'auth';

export const LoginButton: FC<ButtonProps & {
  children?: ReactNode;
  text?: string;
}> = props => {
  const [loginMethodModalOpen, setLoginMethodModalOpen] = useState(false);
  const { loginWithPopup } = useAuthPopup();

  function handleClick() {
    setLoginMethodModalOpen(true);
  }
  function handleClose() {
    setLoginMethodModalOpen(false);
  }

  return (
    <>
      {props.children ? (
        <Box onClick={handleClick} style={{ cursor: 'pointer' }}>
          {props.children}
        </Box>
      ) : (
        <Button variant='contained' color='primary' onClick={handleClick} {...props}>
          {props.text || 'Войти'}
        </Button>
      )}

      <Modal
        open={loginMethodModalOpen}
        onClose={handleClose}
        header={
          <Box mr={4}>
            Войдите удобным
            <br /> для вас способом
          </Box>
        }
      >
        <Button
          onClick={() => loginWithPopup('auth0')}
          fullWidth
          color='secondary'
          variant='contained'
          size='large'
          style={{ marginBottom: 24 }}
        >
          По номеру телефона
        </Button>
        <Typography gutterBottom color='textSecondary' style={{ fontWeight: 500 }}>
          Или через аккаунт соц.сети
        </Typography>
        <AuthSocial />
      </Modal>
    </>
  );
};
