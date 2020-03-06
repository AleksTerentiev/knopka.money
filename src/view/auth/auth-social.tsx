import React, { useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import {
  makeStyles,
  Theme,
  createStyles,
  IconButton,
  Box,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import VKIcon from 'img/social/vk.svg'
import GoogleIcon from 'img/social/google.svg'
import FacebookIcon from 'img/social/facebook.svg'
import OKIcon from 'img/social/ok.svg'
import MailruIcon from 'img/social/mailru.svg'

type Provider = 'google' | 'fb' | 'vk' | 'ok' | 'mailru'

function openSocialLoginPopup(provider: Provider) {
  const width = 480
  const height = 600
  const top = window.innerHeight / 2 - height / 2
  const left = window.innerWidth / 2 - width / 2
  return window.open(
    `${process.env.REACT_APP_API_ORIGIN}/auth/${provider}`,
    'auth',
    `toolbar=no, location=no, directories=no, status=no, menubar=no,
     width=${width}, height=${height}, top=${top}, left=${left}
    `
  )
}

let loginWindow: Window | null

export const AuthSocial = () => {
  const apolloClient = useApolloClient()
  const c = useStyles({})
  const history = useHistory()

  useEffect(() => {
    function loginWindowMessageListener(event: MessageEvent) {
      if (event.origin !== process.env.REACT_APP_API_ORIGIN) {
        return
      }
      const { action, success } = JSON.parse(event.data)
      if (action !== 'auth' || success !== true) {
        return
      }
      if (loginWindow) {
        loginWindow.close()
      }
      // apolloClient.resetStore()
      apolloClient.reFetchObservableQueries()
      history.push('/')
    }

    window.addEventListener('message', loginWindowMessageListener)
    return () => {
      window.removeEventListener('message', loginWindowMessageListener)
      if (loginWindow) {
        loginWindow.close()
      }
    }
  }, [apolloClient, history])

  function handleClick(provider: Provider) {
    loginWindow = openSocialLoginPopup(provider)
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
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
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
)
