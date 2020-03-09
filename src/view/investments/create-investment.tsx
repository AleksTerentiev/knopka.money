import React, { FC, useState, useMemo, useEffect } from 'react'
import {
  useTheme,
  Box,
  Button,
  TextField,
  InputAdornment,
  Typography,
} from '@material-ui/core'
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
import { Currency } from 'view/billing/currency'
import { FDate } from 'view/fdate'

export const CreateInvestment: FC<{ secondary?: boolean }> = ({ secondary }) => {
  const currencyId = 'RUB'
  const { data: accountData } = useQuery<GetAccount>(GET_ACCOUNT)
  const { data: tariffsData } = useQuery<GetTariffs>(GET_TARIFFS)
  const [tariff, setTariff] = useState<GetTariffs_tariffs>()
  const [amount, setAmount] = useState(0)
  const theme = useTheme()

  const { data: balancesData, refetch: refetchBalances } = useQuery<GetBalances>(
    GET_BALANCES
  )
  const balance = useMemo(() => _.find(balancesData?.balances, { currencyId }), [
    balancesData,
  ])

  const disabled = accountData && Number(balance?.amount) === 0
  const c = useStyles({ disabled, secondary })

  const limits = useMemo(() => {
    const constraint = _.find(tariff?.constraints, { currencyId })
    return {
      min: Number(constraint?.minAmount) || 0,
      max: Number(constraint?.maxAmount) || Infinity,
    }
  }, [tariff, currencyId])

  const notEnoughtMoney = !disabled && !!balance && Number(balance.amount) < amount

  useEffect(() => {
    const tariff = tariffsData?.tariffs[secondary ? 0 : tariffsData?.tariffs.length - 1]
    setTariff(tariff)
    const balanceAmount = Number(balance?.amount)
    setAmount(!balanceAmount || balanceAmount >= 1000 ? 1000 : balanceAmount)
  }, [tariffsData, balance])

  const [createInvestment, { loading: creating }] = useMutation(CREATE_INVESTMENT, {
    update(cache, { data: { createInvestment } }) {
      const cachedData: any = cache.readQuery({ query: GET_INVESTMENTS })
      cache.writeQuery({
        query: GET_INVESTMENTS,
        data: { investments: [...cachedData.investments, createInvestment] },
      })
    },
    onCompleted() {
      setAmount(0)
      refetchBalances()
    },
  })

  function handleTariffChange(e: React.ChangeEvent<HTMLInputElement>) {
    const tariff = _.find(tariffsData?.tariffs, { id: e.target.value })
    setTariff(tariff)
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(Number(e.target.value))
  }

  function handleSubmitClick(e: React.FormEvent) {
    e.preventDefault()
    createInvestment({
      variables: { amount, currencyId, investmentTariffId: tariff?.id },
    })
  }

  if (!tariff) {
    return null
  }

  const amountInput = (
    <TextField
      type='number'
      placeholder={'Введите сумму'}
      variant='outlined'
      color={secondary ? 'secondary' : 'primary'}
      fullWidth
      margin={secondary ? 'dense' : 'normal'}
      classes={{ root: c.amountInput }}
      inputProps={{
        min: limits.min,
        max: limits.max,
        className: c.inputField,
        style: { color: secondary ? 'currentColor' : '#FB6F78' },
      }}
      error={notEnoughtMoney}
      value={disabled ? '' : amount || ''}
      onChange={handleAmountChange}
      label={notEnoughtMoney ? 'Недостаточно средств' : ''}
      disabled={disabled}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <Typography
              color={secondary ? 'initial' : 'primary'}
              className={c.inputAdornment}
            >
              ₽
            </Typography>
          </InputAdornment>
        ),
      }}
    />
  )

  return (
    <form className={c.root} onSubmit={handleSubmitClick}>
      {secondary && !disabled && (
        <Typography className={c.label} gutterBottom>
          Мин.{limits.min}₽ - Макс.{limits.max}₽
        </Typography>
      )}

      {secondary && amountInput}

      <div className={c.tariffs}>
        {tariffsData?.tariffs.map(t => (
          <label htmlFor={t.id} className={c.tariff} key={t.id}>
            <input
              disabled={disabled}
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
              style={{
                background:
                  tariff.id === t.id && !disabled ? theme.palette.primary.main : 'none',
                color: disabled
                  ? theme.palette.text.disabled
                  : tariff.id === t.id
                  ? 'white'
                  : theme.palette.primary.main,
              }}
            >
              {!secondary && (
                <span
                  className={c.tariffImgContainer}
                  style={{
                    background: tariff.id === t.id ? 'white' : theme.palette.grey[100],
                  }}
                >
                  <img
                    src={t.days >= 7 ? magicIcon : t.days >= 3 ? flashIcon : fireIcon}
                    className={c.tariffImg}
                    alt=''
                  />
                </span>
              )}
              {t.days} {plural(t.days, 'День', 'Дня', 'Дней')}
            </div>
          </label>
        ))}
      </div>

      {!secondary && amountInput}

      <Box className={c.result}>
        <Typography className={c.resultHeader}>К выплате:</Typography>
        <Box display='flex' alignItems='flex-end' justifyContent='space-between'>
          <Typography variant='h3' className={c.resultAmount} noWrap>
            <Currency
              currencyId={currencyId}
              value={amount + (amount * tariff.percent) / 100}
            />
          </Typography>
          <Typography className={c.resultDate}>
            <FDate date={Date.now() + tariff.days * 24 * 60 * 60 * 1000} />
          </Typography>
        </Box>
      </Box>

      {accountData ? (
        <Button
          type='submit'
          disabled={
            disabled ||
            notEnoughtMoney ||
            creating ||
            amount < limits.min ||
            amount > limits.max
          }
          color='secondary'
          size='large'
          variant='contained'
          style={{ justifyContent: 'flex-start' }}
          fullWidth
        >
          Инвестировать
        </Button>
      ) : (
        <LoginButton size='large' color='secondary' fullWidth />
      )}
    </form>
  )
}
