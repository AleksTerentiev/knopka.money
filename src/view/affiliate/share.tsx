import React, { FC } from 'react';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CopyIcon from 'img/copy.svg';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CopyToClipboard from 'react-copy-to-clipboard';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  VKShareButton,
  VKIcon,
  OKShareButton,
  OKIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  // TwitterShareButton,
  // TwitterIcon,
} from 'react-share';
import { GET_ACCOUNT } from '../../queries';
import { GetAccount } from '../../gql-types/GetAccount';

export const Share: FC = () => {
  const c = useStyles({});
  const { data } = useQuery<GetAccount>(GET_ACCOUNT);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  if (!data) return null;

  const url = `https://neurobet.com?ref=${data.account.id}`;

  return (
    <Box className={c.root}>
      <TextField
        label="Ваша реферальная ссылка"
        variant="outlined"
        value={url}
        // margin="dense"
        style={{ minWidth: xsDown ? 'auto' : 300, background: 'white' }}
        fullWidth={xsDown}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <CopyToClipboard text={url} onCopy={() => setOpenSnackbar(true)}>
                <IconButton edge="end" aria-label="Скопировать" color="primary">
                  <img src={CopyIcon} className={c.copyIcon} alt="Скопировать" />
                </IconButton>
              </CopyToClipboard>
            </InputAdornment>
          ),
        }}
      />

      <Box className={c.shareButtons}>
        <VKShareButton url={url} className={c.shareButton}>
          <VKIcon size={38} round />
        </VKShareButton>
        <OKShareButton url={url} className={c.shareButton}>
          <OKIcon size={38} round />
        </OKShareButton>
        <TelegramShareButton url={url} className={c.shareButton}>
          <TelegramIcon size={38} round />
        </TelegramShareButton>
        <WhatsappShareButton url={url} className={c.shareButton}>
          <WhatsappIcon size={38} round />
        </WhatsappShareButton>
        <FacebookShareButton url={url} className={c.shareButton}>
          <FacebookIcon size={38} round />
        </FacebookShareButton>
        {/* <TwitterShareButton url={url} className={c.shareButton}>
        <TwitterIcon size={36} round />
      </TwitterShareButton> */}
      </Box>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
      >
        <SnackbarContent message="Скопировано" />
      </Snackbar>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // marginTop: theme.spacing(0.5),
    },
    copyIcon: {
      width: '0.8em',
      height: '0.8em',
    },
    shareButtons: {
      display: 'inline-block',
      margin: theme.spacing(0, 2),
    },
    shareButton: {
      margin: theme.spacing(1.5, 0.4, 0),
      display: 'inline-block',
    },
    // input: {
    //   color: '#6fa6d4',
    //   fontSize: '1.3rem',
    // }
  })
);
