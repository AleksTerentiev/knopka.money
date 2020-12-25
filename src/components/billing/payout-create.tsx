import React, { FC, useState } from 'react'
import { useBalance, useCreatePayout } from 'gql'
import { GetPayoutMethods_payoutMethods } from 'gql/types/GetPayoutMethods'
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
}> = ({ method }) => {
  const c = useStyles()
  const [amount, setAmount] = useState(0)
  const [details, setDetails] = useState('')
  const [createSuccess, setCreateSuccess] = useState(false)

  const { balance } = useBalance()
  const [createPayout, { loading: creating, error }] = useCreatePayout()

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(Number(e.target.value))
  }

  function handleDetailsChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDetails(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createPayout({
      variables: {
        amount,
        details,
        currencyId: method.currencyId,
        payoutMethodId: method.id,
      },
    })
    setCreateSuccess(true)
  }

  if (createSuccess) {
    return (
      <Typography>
        Ваша заявка на вывод средств принята и вскоре будет обработана.
      </Typography>
    )
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
            creating ||
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
