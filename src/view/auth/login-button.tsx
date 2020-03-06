import React, { FC, useState } from 'react'
import { Button, ButtonProps } from '@material-ui/core'
import { Modal } from 'view/modal'
import { AuthSocial } from 'view/auth/auth-social'

export const LoginButton: FC<ButtonProps & { text?: string }> = props => {
  const [open, setOpen] = useState(false)

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
          <span>
            Войдите через <br /> аккаунт соц.сети
          </span>
        }
      >
        <AuthSocial />
      </Modal>
    </>
  )
}
