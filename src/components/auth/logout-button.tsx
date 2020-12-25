import React, { PropsWithChildren } from 'react'
import { makeStyles, createStyles, Button } from '@material-ui/core'

export function LogoutButton({
  size = 'medium',
  onClick,
}: PropsWithChildren<{
  size?: 'small' | 'medium' | 'large' | undefined
  onClick?: () => void
}>) {
  const c = useStyles()

  function handleClick() {
    if (onClick) {
      onClick()
    }

    fetch(`${process.env.REACT_APP_API_ORIGIN}/auth/destroy`, {
      credentials: 'include',
    }).then(() => {
      window.location.reload()
    })
  }

  return (
    <Button
      size={size}
      variant='text'
      color='inherit'
      onClick={handleClick}
      className={c.root}
    >
      Выйти
    </Button>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      opacity: 0.8,
    },
  })
)
