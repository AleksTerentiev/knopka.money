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
  Divider,
} from '@material-ui/core';
import clsx from 'clsx';
import { useGlobalStyles } from 'styles';
import { Currency } from 'components/billing/currency';
import { FDate } from 'components/fdate';

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
    `${process.env.REACT_APP_API_ORIGIN}/freekassa/pay?amount=${amount}`,
    'pay',
    `toolbar=no, location=no, directories=no, status=no, menubar=no`
  );
}

let payWindow: Window | null;

const limits = {
  min: 200,
  max: 15000,
};

export const CreateInvoice = () => {
  const c = useCreateInvoiceStyles({});
  const { refetch: refetchInvoices } = useInvoices();
  const { refetch: refetchBalances } = useBalance();
  const [amount, setAmount] = useState(1000);

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(Number(e.target.value));
  }

  useEffect(() => {
    function payWindowMessageListener(event: MessageEvent) {
      if (event.origin !== process.env.REACT_APP_API_ORIGIN) {
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
      // if (payWindow) {
      //   payWindow.close()
      // }
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
          Мин.{limits.min}₽ - Макс.{limits.max}₽
        </Typography>
        <TextField
          type='number'
          placeholder={'Введите сумму'}
          variant='outlined'
          color='secondary'
          fullWidth
          margin='dense'
          classes={{ root: c.input }}
          inputProps={{ min: limits.min, max: limits.max }}
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
          disabled={!amount || amount < limits.min || amount > limits.max}
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

export const Invoices = () => {
  const gc = useGlobalStyles();
  const c = useInvoicesStyles({});
  const { invoices } = useInvoices();

  return (
    <Box>
      <Typography variant='h3' gutterBottom={invoices.length > 0}>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <span>История</span>
          <span className={c.count}>{invoices.length || ''}</span>
        </Box>
      </Typography>
      {invoices.length > 0 ? (
        <Box mt={1}>
          <Divider className={c.divider} />
          <Box className={c.invoices}>
            {invoices.map(invoice => (
              <Card className={clsx(c.invoice, gc.cardDense)} key={invoice.id}>
                <Box>
                  <Typography className={gc.cardLabel}>Дата</Typography>
                  <Box color='grey.400'>
                    <Typography className={gc.cardValue}>
                      {<FDate date={invoice.createdAt} />}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography className={gc.cardLabel}>Сумма</Typography>
                  <Typography className={gc.cardValue}>
                    <Currency
                      value={invoice.amount}
                      fraction={0}
                      currencyId={invoice.currencyId}
                    />
                  </Typography>
                </Box>
                <Box>
                  <Typography className={gc.cardLabel}>Статус</Typography>
                  <Typography className={gc.cardValue}>
                    {invoice.status === 'pending' && 'В обработке'}
                    {invoice.status === 'successful' && 'Проведен'}
                    {invoice.status === 'failed' && 'Отклонен'}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
      ) : (
        <Box fontWeight='fontWeightMedium' color='text.hint' mt={1}>
          <Typography>Пополнений не найдено</Typography>
        </Box>
      )}
    </Box>
  );
};

const useInvoicesStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    divider: {
      display: 'none',
      [theme.breakpoints.up('lg')]: {
        marginBottom: theme.spacing(4),
        display: 'block',
      },
    },
    count: {
      color: theme.palette.grey[500],
    },
    invoices: {
      [theme.breakpoints.up('lg')]: {
        maxHeight: 620,
        overflowY: 'scroll',
      },
    },
    invoice: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridColumnGap: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        gridColumnGap: theme.spacing(3),
      },
    },
  })
);
