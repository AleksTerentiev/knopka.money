import React, { FC, useEffect } from 'react'
import { makeStyles, Theme, createStyles, Button, ButtonProps } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import GoogleIcon from 'img/google.svg'
import { useApolloClient } from '@apollo/react-hooks'

function openSocialLoginPopup() {
  const width = 480
  const height = 600
  const top = window.innerHeight / 2 - height / 2
  const left = window.innerWidth / 2 - width / 2
  return window.open(
    `${process.env.REACT_APP_API_ORIGIN}/auth/google`,
    'auth',
    `toolbar=no, location=no, directories=no, status=no, menubar=no,
     width=${width}, height=${height}, top=${top}, left=${left}
    `
  )
}

let loginWindow: Window | null

export const LoginButton: FC<ButtonProps> = props => {
  const apolloClient = useApolloClient()
  const { t } = useTranslation()
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

  function handleLoginClick() {
    loginWindow = openSocialLoginPopup()
  }

  return (
    <Button
      className={c.root}
      variant='contained'
      color='primary'
      onClick={handleLoginClick}
      {...props}
    >
      {t('Log in with')}
      <img alt='Google' src={GoogleIcon} className={c.icon} />
    </Button>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    icon: {
      height: '1rem',
      marginLeft: 10,
    },
  })
)
