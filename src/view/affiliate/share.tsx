import React, { FC, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GetAccount } from 'gql-types/GetAccount'
import { GET_ACCOUNT } from 'queries'
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
  useMediaQuery,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Snackbar,
  SnackbarContent,
  Typography,
} from '@material-ui/core'
import CopyIcon from 'img/copy.svg'
import CopyToClipboard from 'react-copy-to-clipboard'
import {
  VKShareButton,
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from 'react-share'
import VKIcon from 'img/vk.svg'
import FacebookIcon from 'img/facebook.svg'
import TelegramIcon from 'img/telegram.svg'
import WhatsappIcon from 'img/whatsapp.svg'

export const Share: FC = () => {
  const c = useStyles({})
  const { data: accountData } = useQuery<GetAccount>(GET_ACCOUNT)
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false)
  const theme = useTheme()
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'))

  if (!accountData) return null

  const url = `https://knopka.money?ref=${accountData.account.id}`

  return (
    <Box className={c.root}>
      <Typography className={c.label} gutterBottom>
        Ваша реферальная ссылка
      </Typography>
      <TextField
        className={c.textField}
        variant='outlined'
        value={url + '22'}
        margin='dense'
        fullWidth={xsDown}
        InputProps={{
          className: c.inputField,
          endAdornment: (
            <InputAdornment position='end'>
              <CopyToClipboard text={url} onCopy={() => setSnackbarIsOpen(true)}>
                <IconButton edge='end' aria-label='Скопировать' color='primary'>
                  <img src={CopyIcon} className={c.copyIcon} alt='Скопировать' />
                </IconButton>
              </CopyToClipboard>
            </InputAdornment>
          ),
        }}
      />

      <Typography className={c.label} gutterBottom>
        Поделиться ссылкой в сети
      </Typography>
      <Box>
        <VKShareButton url={url} className={c.socialButton}>
          <img src={VKIcon} className={c.socialButtonIcon} alt='VK' />
        </VKShareButton>
        <FacebookShareButton url={url} className={c.socialButton}>
          <img src={FacebookIcon} className={c.socialButtonIcon} alt='Facebook' />
        </FacebookShareButton>
        <TelegramShareButton url={url} className={c.socialButton}>
          <img src={TelegramIcon} className={c.socialButtonIcon} alt='Telegram' />
        </TelegramShareButton>
        <WhatsappShareButton url={url} className={c.socialButton}>
          <img src={WhatsappIcon} className={c.socialButtonIcon} alt='Whatsapp' />
        </WhatsappShareButton>
      </Box>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={snackbarIsOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarIsOpen(false)}
      >
        <SnackbarContent message='Ссылка скопирована' />
      </Snackbar>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    label: {
      color: theme.palette.text.hint,
    },
    copyIcon: {
      width: 14,
      height: 14,
      [theme.breakpoints.up('sm')]: {
        width: 18,
        height: 18,
      },
      [theme.breakpoints.up('md')]: {
        width: 20,
        height: 20,
      },
    },
    textField: {
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        minWidth: 434,
      },
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(3),
        minWidth: 472,
      },
    },
    inputField: {
      borderRadius: 28,
      paddingLeft: 8,
      paddingRight: 18,
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 12,
        paddingRight: 22,
      },
      '& input': {
        textOverflow: 'ellipsis',
      },
    },
    socialButton: {
      display: 'inline-block',
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: '50%',
      marginRight: theme.spacing(2),
      padding: 8,
      [theme.breakpoints.up('md')]: {
        marginRight: theme.spacing(3),
        padding: 14,
      },
    },
    socialButtonIcon: {
      verticalAlign: 'middle',
      height: 17,
      width: 22,
      [theme.breakpoints.up('md')]: {
        height: 26,
        width: 26,
      },
    },
    // input: {
    //   color: '#6fa6d4',
    //   fontSize: '1.3rem',
    // }
  })
)
