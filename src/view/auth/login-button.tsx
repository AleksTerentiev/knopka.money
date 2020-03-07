import React, { FC, useState } from 'react'
import { Box, Button, ButtonProps, Typography } from '@material-ui/core'
import { Modal } from 'view/modal'
import { AuthSocial } from 'view/auth/auth-social'
import { useAuthPopup } from './useAuthPopup'

export const LoginButton: FC<ButtonProps & { text?: string }> = props => {
  const [open, setOpen] = useState(false)
  const { loginWithPopup } = useAuthPopup()

  function handleClick() {
    setOpen(true)
  }
  function handleClose() {
    setOpen(false)
  }

  return (
    <>
      <Button variant='contained' color='primary' onClick={handleClick} {...props}>
        {props.text || 'Войти'}
      </Button>

      <Modal
        open={open}
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
          color='primary'
          variant='contained'
          size='large'
          style={{ marginBottom: 24 }}
        >
          По номеру телефона
        </Button>
        <Typography gutterBottom>Или через аккаунт соц.сети</Typography>
        <AuthSocial />
      </Modal>
    </>
  )
}
