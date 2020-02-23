import React, { useState, useMemo, useEffect } from 'react'
import { Box, Button, TextField, InputAdornment, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import _ from 'lodash'
import {
  GET_TARIFFS,
  GET_ACCOUNT,
  CREATE_INVESTMENT,
  GET_BALANCES,
  GET_INVESTMENTS,
} from 'queries'
import { GetTariffs, GetTariffs_tariffs } from 'gql-types/GetTariffs'
import { GetAccount } from 'gql-types/GetAccount'
import { GetBalances } from 'gql-types/GetBalances'
import { useStyles } from './create-investment.c'
import fireIcon from 'img/fire.svg'
import flashIcon from 'img/flash.svg'
import magicIcon from 'img/magic.svg'
import { LoginButton } from 'view/auth/login-button'
import plural from 'plural-ru'

export function CreateInvestment() {
  const currencyId = 'RUB'
  const history = useHistory()
  const c = useStyles({})

  const { data: accountData } = useQuery<GetAccount>(GET_ACCOUNT)
  const { data: tariffsData } = useQuery<GetTariffs>(GET_TARIFFS)
  const [tariff, setTariff] = useState<GetTariffs_tariffs>()
  const [amount, setAmount] = useState('')
  const [resultAmount, setResultAmount] = useState(0)
  const [notEnoughtMoney, setNotEnoughtMoney] = useState()
  const [errorText, setErrorText] = useState()

  const { data: balancesData, refetch: refetchBalances } = useQuery<GetBalances>(
    GET_BALANCES
  )
  const balance = useMemo(
    () => balancesData && _.find(balancesData.balances, { currencyId }),
    [balancesData]
  )

  useEffect(() => {
    setTariff(tariffsData?.tariffs[0])
  }, [tariffsData])

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

  function handleTariffChange(e: React.ChangeEvent<HTMLInputElement>) {
    const amountValue = Number(amount)
    const tariff = _.find(tariffsData?.tariffs, { id: e.target.value })
    setTariff(tariff)
    setResultAmount(tariff ? amountValue + (amountValue * tariff.percent) / 100 : 0)
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.value)
    const value = Number(e.target.value)
    setResultAmount(tariff ? value + (value * tariff.percent) / 100 : 0)
    const notEnoughtMoney = !!balance && Number(balance.amount) < value
    setNotEnoughtMoney(notEnoughtMoney)
    setErrorText(notEnoughtMoney ? 'Недостаточно средств' : '')
  }

  function handleSubmitClick(e: React.FormEvent) {
    e.preventDefault()
    const constraint = _.find(tariff?.constraints, { currencyId })
    if (!constraint) return
    if (Number(amount) < Number(constraint.minAmount)) {
      return setErrorText(`Минимальная сумма - ${constraint.minAmount}₽`)
    }
    if (Number(amount) > Number(constraint.maxAmount)) {
      return setErrorText(`Максимальная сумма - ${constraint.maxAmount}₽`)
    }
    createInvestment({
      variables: { amount: Number(amount), currencyId, investmentTariffId: tariff?.id },
    })
  }

  if (!tariff) {
    return null
  }

  return (
    <Box className={c.root}>
      <form className={c.form} onSubmit={handleSubmitClick}>
        <div className={c.tariffs}>
          {tariffsData?.tariffs.map(t => (
            <label htmlFor={t.id} className={c.tariff} key={t.id}>
              <input
                type='radio'
                name='tariff'
                id={t.id}
                value={t.id}
                className={c.tariffInput}
                checked={tariff.id === t.id}
                onChange={handleTariffChange}
              />
              <div
                className={c.tariffLabel}
                style={{ color: tariff.id === t.id ? 'white' : '#FB6F78' }}
              >
                <span
                  className={c.tariffImgContainer}
                  style={{ background: tariff.id === t.id ? 'white' : '#F9F9F9' }}
                >
                  <img
                    src={t.days >= 7 ? magicIcon : t.days >= 3 ? flashIcon : fireIcon}
                    className={c.tariffImg}
                  />
                </span>
                {t.days} {plural(t.days, 'день', 'дня', 'дней')}
              </div>
            </label>
          ))}
        </div>

        <TextField
          type='number'
          placeholder={'Введите сумму'}
          variant='outlined'
          color='primary'
          fullWidth
          classes={{ root: c.amountInput }}
          inputProps={{ min: 0, className: c.inputField, style: { color: '#FB6F78' } }}
          error={!!errorText}
          value={amount}
          onChange={handleAmountChange}
          label={errorText}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Typography color='primary' className={c.inputAdornment}>
                  ₽
                </Typography>
              </InputAdornment>
            ),
          }}
        />

        <Box className={c.result}>
          <Typography className={c.resultHeader}>К выплате:</Typography>
          <Box display='flex' alignItems='flex-end' justifyContent='space-between'>
            <Typography variant='h3' color='primary' className={c.resultAmount}>
              ₽ {resultAmount.toFixed(2)}
            </Typography>
            <Typography className={c.resultDate}>
              {new Date(Date.now() + tariff.days * 24 * 60 * 60 * 1000)
                .toLocaleDateString('default', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                })
                .replace(/\//g, '.')}
            </Typography>
          </Box>
        </Box>

        {!accountData ? (
          <LoginButton color='secondary' fullWidth />
        ) : notEnoughtMoney ? (
          <Button
            color='primary'
            variant='text'
            fullWidth
            style={{ justifyContent: 'flex-start' }}
            onClick={() => history.push('/refill')}
          >
            Пополнить баланс
          </Button>
        ) : (
          <Button
            type='submit'
            disabled={creating}
            color='secondary'
            size='large'
            variant='contained'
            style={{ justifyContent: 'flex-start' }}
            fullWidth
          >
            Инвестировать
          </Button>
        )}
      </form>
    </Box>
  )
}
