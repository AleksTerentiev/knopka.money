import React, { FC, useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GetPayoutMethods_payoutMethods } from 'gql-types/GetPayoutMethods'
// import { GetPayouts } from 'gql-types/GetPayouts'
import { GetBalances } from 'gql-types/GetBalances'
import { GET_PAYOUTS, CREATE_PAYOUT, GET_BALANCES } from 'queries'
import {
  createStyles,
  makeStyles,
  Theme,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from '@material-ui/core'
import _ from 'lodash'
import { useBalance } from 'hooks/useBalance'

export const PayoutCreate: FC<{
  method: GetPayoutMethods_payoutMethods
  onCreate?: () => void
}> = ({ method, onCreate }) => {
  const c = useStyles({})
  const [amount, setAmount] = useState(0)
  const [details, setDetails] = useState('')

  // const { refetch: refetchPayouts } = useQuery<GetPayouts>(GET_PAYOUTS)
  const balance = useBalance()
  const { refetch: refetchBalances } = useQuery<GetBalances>(GET_BALANCES)
  const [createPayout, { loading, error }] = useMutation(CREATE_PAYOUT, {
    update(cache, { data: { createPayout } }) {
      const cachedData: any = cache.readQuery({ query: GET_PAYOUTS })
      cache.writeQuery({
        query: GET_PAYOUTS,
        data: { payouts: [...cachedData.payouts, createPayout] },
      })
    },
    onCompleted() {
      setAmount(0)
      setDetails('')
      // refetchPayouts()
      refetchBalances()
      if (onCreate) {
        onCreate()
      }
    },
  })

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(Number(e.target.value))
  }

  function handleDetailsChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDetails(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createPayout({
      variables: {
        amount,
        details,
        currencyId: method.currencyId,
        payoutMethodId: method.id,
      },
    })
  }

  return (
    <form className={c.root} onSubmit={handleSubmit}>
      <Typography className={c.label} gutterBottom>
        Мин.{method.minAmount}₽ - Макс.{method.maxAmount}₽
      </Typography>
      <TextField
        type='number'
        autoFocus
        variant='outlined'
        color='secondary'
        fullWidth
        margin='dense'
        classes={{ root: c.input }}
        inputProps={{
          min: method.minAmount,
          max: method.maxAmount,
        }}
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

      <Typography className={c.label} gutterBottom>
        с учетом {((1 - Number(method.rate)) * 100).toFixed()}% комиссии
      </Typography>
      <TextField
        type='number'
        autoFocus
        variant='outlined'
        color='secondary'
        fullWidth
        margin='dense'
        disabled
        className={c.result}
        classes={{ root: c.input }}
        value={(amount * Number(method.rate)).toFixed(2)}
        InputProps={{
          className: c.result,
          endAdornment: (
            <InputAdornment position='end'>
              <Typography color='textPrimary'>₽</Typography>
            </InputAdornment>
          ),
        }}
      />

      <Typography className={c.label} gutterBottom>
        Номер {method.id === 'VISA/MASTERCARD' ? 'Карты' : 'Кошелька'}
      </Typography>
      <TextField
        variant='outlined'
        color='secondary'
        fullWidth
        margin='dense'
        classes={{ root: c.input }}
        value={details}
        onChange={handleDetailsChange}
      />

      {error && <Typography color='error'>{error}</Typography>}

      <Box pt={3}>
        <Button
          type='submit'
          color='secondary'
          size='large'
          variant='contained'
          className={c.submitButton}
          disabled={
            loading ||
            !amount ||
            details.length < 6 ||
            amount < Number(method.minAmount) ||
            amount > Number(method.maxAmount) ||
            !balance ||
            amount > balance
          }
          style={{ justifyContent: 'flex-start' }}
          fullWidth
        >
          Вывести Средства
        </Button>
      </Box>
    </form>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    label: {
      color: theme.palette.grey[400],
      fontWeight: theme.typography.fontWeightMedium,
    },
    input: {
      marginBottom: theme.spacing(3),
      '& .MuiOutlinedInput-root': {
        borderRadius: theme.shape.borderRadius * 2,
      },
    },
    result: {
      '& fieldset': {
        border: 'none',
      },
      '& input': {
        color: theme.palette.text.primary,
      },
      borderRadius: theme.shape.borderRadius * 2,
      background: theme.palette.grey[100],
    },
    submitButton: {
      borderRadius: theme.shape.borderRadius * 2,
    },
  })
)
