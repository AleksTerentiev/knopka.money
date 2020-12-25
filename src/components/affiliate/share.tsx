import React, { FC, useState } from 'react';
import { useAccount } from 'gql';
import {
  useTheme,
  useMediaQuery,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Snackbar,
  SnackbarContent,
  Typography,
} from '@material-ui/core';
import { useStyles } from './share.c';
import CopyIcon from 'img/copy.svg';
import CopyToClipboard from 'react-copy-to-clipboard';
import {
  VKShareButton,
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from 'react-share';
import VKIcon from 'img/vk.svg';
import FacebookIcon from 'img/facebook.svg';
import TelegramIcon from 'img/telegram.svg';
import WhatsappIcon from 'img/whatsapp.svg';

export const Share: FC = () => {
  const c = useStyles();
  const { account } = useAccount();
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false);
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  if (!account) return null;

  const url = `https://knopka.money?ref=${account.id}`;

  return (
    <Box className={c.root}>
      <Typography className={c.label} gutterBottom>
        Ваша реферальная ссылка
      </Typography>
      <TextField
        className={c.textField}
        variant='outlined'
        value={url}
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
        Вы можете отслеживать пришедших по ссылке добавляя к ней ваш код пикселя
      </Typography>
      <TextField
        className={c.textField}
        variant='outlined'
        value={'&pixel=1234567890'}
        margin='dense'
        fullWidth={xsDown}
        InputProps={{
          className: c.inputField,
          endAdornment: (
            <InputAdornment position='end'>
              <CopyToClipboard
                text={'&pixel=1234567890'}
                onCopy={() => setSnackbarIsOpen(true)}
              >
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
        autoHideDuration={1000}
        onClose={() => setSnackbarIsOpen(false)}
      >
        <SnackbarContent classes={{ root: c.snackbar }} message='Ссылка скопирована' />
      </Snackbar>
    </Box>
  );
};
