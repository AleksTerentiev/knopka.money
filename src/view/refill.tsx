import React, { useState, useEffect, useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GetInvoices } from 'gql-types/GetInvoices'
import { GET_INVOICES } from 'queries'
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
} from '@material-ui/core'
import clsx from 'clsx'
import { useGlobalStyles } from 'styles'
import { Currency } from 'view/billing/currency'
import { FDate } from 'view/fdate'
import { orderBy } from 'lodash'

export const Refill = () => {
  const gc = useGlobalStyles({})
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
  )
}

function openPayWindow(amount: string) {
  return window.open(
    `${process.env.REACT_APP_API_ORIGIN}/freekassa/pay?amount=${amount}`,
    'pay',
    `toolbar=no, location=no, directories=no, status=no, menubar=no`
  )
}

let payWindow: Window | null

export const CreateInvoice = () => {
  const gc = useGlobalStyles({})
  const c = useCreateInvoiceStyles({})
  const { refetch: refetchInvoices } = useQuery<GetInvoices>(GET_INVOICES)
  const [amount, setAmount] = useState('1000')

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.value)
  }

  useEffect(() => {
    function payWindowMessageListener(event: MessageEvent) {
      if (event.origin !== process.env.REACT_APP_API_ORIGIN) {
        return
      }
      const { action, success } = JSON.parse(event.data)
      if (action !== 'pay' || success !== true) {
        return
      }
      if (payWindow) {
        payWindow.close()
      }
      refetchInvoices()
    }

    window.addEventListener('message', payWindowMessageListener)
    return () => {
      window.removeEventListener('message', payWindowMessageListener)
      // if (payWindow) {
      //   payWindow.close()
      // }
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    payWindow = openPayWindow(amount)
  }

  return (
    <Card className={clsx(c.root, gc.card)}>
      <form onSubmit={handleSubmit}>
        <TextField
          type='number'
          placeholder={'Введите сумму'}
          variant='outlined'
          color='secondary'
          fullWidth
          margin='dense'
          classes={{ root: c.input }}
          inputProps={{ min: 0 }}
          value={amount}
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
          disabled={!amount}
          style={{ justifyContent: 'flex-start' }}
          fullWidth
        >
          Пополнить Счет
        </Button>
      </form>
    </Card>
  )
}

const useCreateInvoiceStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 544,
    },
    input: {
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(3),
      },
    },
  })
)

export const Invoices = () => {
  const gc = useGlobalStyles({})
  const c = useInvoicesStyles({})
  const { data } = useQuery<GetInvoices>(GET_INVOICES)

  const invoices = useMemo(() => {
    return orderBy(data?.invoices, ['createdAt'], ['desc'])
  }, [data])

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
                    <Currency value={invoice.amount} fraction={0} currencyId='RUB' />
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
  )
}

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
)
