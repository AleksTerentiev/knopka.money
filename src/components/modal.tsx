import React, { FC } from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  useMediaQuery,
  Dialog,
  Typography,
  IconButton,
  Box,
  useTheme,
  Divider,
} from '@material-ui/core'
import CloseIcon from 'img/close.svg'

export const Modal: FC<{
  open: boolean
  header: React.ReactNode
  children: any
  onClose: () => void
}> = ({ open, header, children, onClose }) => {
  const c = useStyles({})
  const theme = useTheme()
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'))
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog onClose={onClose} open={open} fullScreen={xsDown}>
      <Box className={c.title}>
        <Typography variant='h3' gutterBottom>
          {header}
        </Typography>
        <IconButton
          edge='end'
          aria-label='close'
          className={c.closeButton}
          onClick={onClose}
          size={smDown ? 'small' : 'medium'}
        >
          <img src={CloseIcon} alt='close' />
        </IconButton>
        <Divider />
      </Box>

      <Box pt={4}>{children}</Box>
    </Dialog>
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
  })
)
