import React, { useState } from 'react'
import {
  createStyles,
  makeStyles,
  Theme,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
} from '@material-ui/core'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { CREATE_INVOICE, GET_BALANCES } from 'queries'
import { GetBalances } from 'gql-types/GetBalances'

export const Refill = () => {
  const currencyId = 'RUB'

  const c = useStyles({})
  const [amount, setAmount] = useState('')
  const { refetch: refetchBalances } = useQuery<GetBalances>(GET_BALANCES)

  const [createInvestment, { loading: creating }] = useMutation(CREATE_INVOICE, {
    async onCompleted() {
      setAmount('')
      await refetchBalances()
    },
  })

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.value)
  }

  async function handleSubmitClick(e: React.FormEvent) {
    e.preventDefault()
    if (!amount) {
      return
    }
    await createInvestment({ variables: { amount: Number(amount), currencyId } })
  }

  return (
    <Box>
      <Box mb={4}>
        <Typography variant='h2'>Пополнить счет</Typography>
      </Box>
      <Paper className={c.root}>
        <Box px={3} pt={4} pb={5}>
          <form className={c.form} onSubmit={handleSubmitClick}>
            <TextField
              type='number'
              label={'Сумма, ₽'}
              variant='outlined'
              fullWidth
              className={c.amountInput}
              style={{ background: 'white' }}
              inputProps={{ min: 0 }}
              value={amount}
              onChange={handleAmountChange}
            />
            <Button
              type='submit'
              disabled={creating}
              color='primary'
              size='large'
              variant='contained'
              fullWidth
            >
              Пополнить
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 544,
      border: `1px solid ${theme.palette.divider}`,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
    },
    form: {
      width: '100%',
      '@media (min-width: 400px)': {
        width: 280,
        margin: 'auto',
      },
    },
    amountInput: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(1.5),
    },
    inputField: {
      background: 'white',
    },
  })
)
