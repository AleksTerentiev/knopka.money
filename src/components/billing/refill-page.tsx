import React, { useState, useEffect } from 'react';
import { useBalance, useInvoices } from 'gql';
import {
  createStyles,
  makeStyles,
  Theme,
  Box,
  Card,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from '@material-ui/core';
import { useGlobalStyles } from 'styles';
import { Invoices } from './invoices';

export const RefillPage = () => {
  const gc = useGlobalStyles();
  return (
    <Box className={gc.page}>
      <Box>
        <Typography variant='h2' gutterBottom>
          Пополняй Просто
        </Typography>
        <CreateInvoice />
      </Box>
      <Invoices />
    </Box>
  );
};

function openPayWindow(amount: number) {
  return window.open(
    `${process.env.REACT_APP_API_URL}/freekassa/pay?amount=${amount}`,
    'pay',
    `toolbar=no, location=no, directories=no, status=no, menubar=no`
  );
}

let payWindow: Window | null;

const REFILL_LIMIT = {
  min: 200,
  max: 15000,
};

export const CreateInvoice = () => {
  const c = useCreateInvoiceStyles();
  const { refetch: refetchInvoices } = useInvoices();
  const { refetch: refetchBalances } = useBalance();
  const [amount, setAmount] = useState(1000);

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(Number(e.target.value));
  }

  useEffect(() => {
    function payWindowMessageListener(event: MessageEvent) {
      if (event.origin !== process.env.REACT_APP_API_URL) {
        return;
      }
      const { action, status } = JSON.parse(event.data);
      if (action !== 'freekassa') {
        return;
      }
      if (status !== 'success') {
        return alert(`Что-то пошло не так :( Статус платежа: "${status}"`);
      }
      if (payWindow) {
        payWindow.close();
      }
      refetchInvoices();
      refetchBalances();
    }

    window.addEventListener('message', payWindowMessageListener);
    return () => {
      window.removeEventListener('message', payWindowMessageListener);
      if (payWindow) {
        payWindow.close();
      }
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    payWindow = openPayWindow(amount);
  }

  return (
    <Card className={c.root}>
      <form onSubmit={handleSubmit}>
        <Typography className={c.label} gutterBottom>
          Мин.{REFILL_LIMIT.min}₽ - Макс.{REFILL_LIMIT.max}₽
        </Typography>
        <TextField
          type='number'
          placeholder={'Введите сумму'}
          variant='outlined'
          color='secondary'
          fullWidth
          margin='dense'
          classes={{ root: c.input }}
          inputProps={{ min: REFILL_LIMIT.min, max: REFILL_LIMIT.max }}
          value={amount || ''}
          onChange={handleAmountChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Typography>₽</Typography>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type='submit'
          color='secondary'
          size='large'
          variant='contained'
          disabled={!amount || amount < REFILL_LIMIT.min || amount > REFILL_LIMIT.max}
          style={{ justifyContent: 'flex-start' }}
          fullWidth
        >
          Пополнить Счет
        </Button>
      </form>
    </Card>
  );
};

const useCreateInvoiceStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 544,
    },
    label: {
      color: theme.palette.grey[400],
      fontWeight: theme.typography.fontWeightMedium,
    },
    input: {
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(3),
      },
    },
  })
);
