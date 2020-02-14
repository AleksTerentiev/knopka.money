import React, { useState, useMemo } from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  Paper,
  Button,
  TextField,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import _ from 'lodash'
import { CREATE_INVESTMENT, GET_BALANCES, GET_INVESTMENTS } from 'queries'
import { GetBalances } from 'gql-types/GetBalances'

export function CreateInvestment() {
  const investmentTariffId = 'BASIC'
  const currencyId = 'RUB'
  const amountMin = 100
  const history = useHistory()

  const c = useStyles({})
  const [amount, setAmount] = useState('')
  const [notEnoughtMoney, setNotEnoughtMoney] = useState()
  const [errorText, setErrorText] = useState()
  const { data: balancesData, refetch: refetchBalances } = useQuery<GetBalances>(
    GET_BALANCES
  )
  const balance = useMemo(
    () => balancesData && _.find(balancesData.balances, { currencyId }),
    [balancesData]
  )

  const [createInvestment, { loading: creating }] = useMutation(CREATE_INVESTMENT, {
    update(cache, { data: { createInvestment } }) {
      const cachedData: any = cache.readQuery({ query: GET_INVESTMENTS })
      cache.writeQuery({
        query: GET_INVESTMENTS,
        data: { investments: [...cachedData.investments, createInvestment] },
      })
    },
    onCompleted() {
      setAmount('')
      refetchBalances()
    },
  })

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.value)
    const notEnoughtMoney = !!balance && Number(balance.amount) < Number(e.target.value)
    setNotEnoughtMoney(notEnoughtMoney)
    setErrorText(notEnoughtMoney ? 'Недостаточно средств' : '')
  }

  function handleSubmitClick(e: React.FormEvent) {
    e.preventDefault()
    if (Number(amount) < amountMin) {
      return setErrorText(`Минимальная сумма - ${amountMin}₽`)
    }
    createInvestment({
      variables: { amount: Number(amount), currencyId, investmentTariffId },
    })
  }

  return (
    <Paper className={c.root}>
      <Box px={3} pt={4} pb={5}>
        <form className={c.form} onSubmit={handleSubmitClick}>
          <TextField
            type='number'
            label={errorText || 'Сумма, ₽'}
            variant='outlined'
            fullWidth
            className={c.amountInput}
            style={{ background: 'white' }}
            inputProps={{ min: 0 }}
            error={!!errorText}
            value={amount}
            onChange={handleAmountChange}
            // helperText={errorText}
            // autoFocus
            // margin='dense'
            // InputLabelProps={{
            //   shrink: true,
            // }}
          />
          {notEnoughtMoney ? (
            <Button
              color='primary'
              variant='text'
              fullWidth
              onClick={() => history.push('/refill')}
            >
              Пополнить баланс
            </Button>
          ) : (
            <Button
              type='submit'
              disabled={creating}
              color='primary'
              size='large'
              variant='contained'
              fullWidth
            >
              Инвестировать
            </Button>
          )}
        </form>
      </Box>
    </Paper>
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
