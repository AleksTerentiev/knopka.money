import React from 'react';
import { useInvoices } from 'gql';
import {
  createStyles,
  makeStyles,
  Theme,
  Box,
  Card,
  Typography,
  Divider,
} from '@material-ui/core';
import { useGlobalStyles } from 'styles';
import clsx from 'clsx';
import { Currency } from 'components/billing/currency';
import { FDate } from 'components/fdate';

export const Invoices = () => {
  const gc = useGlobalStyles();
  const c = useStyles();
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

const useStyles = makeStyles((theme: Theme) =>
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
