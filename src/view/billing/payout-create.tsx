import React, { FC, useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GetPayoutMethods_payoutMethods } from 'gql-types/GetPayoutMethods'
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

export const PayoutCreate: FC<{
  method: GetPayoutMethods_payoutMethods
  onCreate?: () => void
}> = ({ method, onCreate }) => {
  const c = useStyles({})
  const [amount, setAmount] = useState(0)
  const [details, setDetails] = useState('')

  const { refetch: refetchBalances } = useQuery<GetBalances>(GET_BALANCES)

  const [createPayout, { loading, error }] = useMutation(CREATE_PAYOUT, {
    update(cache, { data: { createdPayout } }) {
      const cachedData: any = cache.readQuery({ query: GET_PAYOUTS })
      cache.writeQuery({
        query: GET_PAYOUTS,
        data: { payouts: [...cachedData.payouts, createdPayout] },
      })
    },
    onCompleted() {
      setAmount(0)
      setDetails('')
      if (onCreate) {
        onCreate()
      }
      refetchBalances()
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
        Мин.{method.minAmount}₽ Макс. {method.maxAmount}₽
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
          disabled={
            loading ||
            !amount ||
            details.length < 6 ||
            amount < Number(method.minAmount) ||
            amount > Number(method.maxAmount)
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
    },
  })
)
