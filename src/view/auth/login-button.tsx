import React, { FC, useState } from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  useMediaQuery,
  Button,
  ButtonProps,
  Dialog,
  Typography,
  IconButton,
  Box,
  useTheme,
  Divider,
} from '@material-ui/core'
import CloseIcon from 'img/close.svg'
import { AuthSocial } from 'view/auth/auth-social'

export const LoginButton: FC<ButtonProps & { text?: string }> = props => {
  const c = useStyles({})
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'))

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

      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        fullScreen={xsDown}
      >
        <Box className={c.title}>
          <Typography variant='h3' gutterBottom>
            Войдите через <br /> аккаунт соц.сети
          </Typography>
          <IconButton
            aria-label='close'
            className={c.closeButton}
            onClick={handleClose}
            size={xsDown ? 'small' : 'medium'}
          >
            <img src={CloseIcon} alt='close' />
          </IconButton>
          <Divider />
        </Box>

        <Box pt={4}>
          <AuthSocial />
        </Box>
      </Dialog>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      margin: 0,
      position: 'relative',
    },
    closeButton: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    content: {
      padding: 0,
    },
  })
)
