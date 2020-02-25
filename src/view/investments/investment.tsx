import React from 'react'
import { Paper, Box, Typography, Button } from '@material-ui/core'
import { useStyles } from './investment.c'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Currency } from 'view/billing/currency'
import Timer from 'react-compound-timer'
import { CLOSE_INVESTMENT, GET_BALANCES, GET_INVESTMENT } from 'queries'
import { GetBalances } from 'gql-types/GetBalances'
import { GetInvestment } from 'gql-types/GetInvestment'
import { InvestmentData } from 'gql-types/InvestmentData'
import { FDate } from 'view/fdate'
import plural from 'plural-ru'
import moment from 'moment'

export function Investment({
  id,
  amount,
  currencyId,
  estimatedPayoutAmount,
  createdAt,
  endsAt,
  isReady,
  payoutDate,
}: InvestmentData) {
  const c = useStyles({})
  const { refetch: refetchBalances } = useQuery<GetBalances>(GET_BALANCES)
  const { refetch: refetchInvestment } = useQuery<GetInvestment>(GET_INVESTMENT, {
    variables: { id },
  })

  const [closeInvestment, { loading: payouting }] = useMutation(CLOSE_INVESTMENT, {
    async onCompleted() {
      await refetchBalances()
    },
  })

  async function handlePayout() {
    await closeInvestment({ variables: { id } })
  }

  return (
    <Paper className={c.root}>
      <Box>
        <Typography className={c.label}>Id</Typography>
        <Typography className={c.value}>{id}</Typography>
      </Box>

      <Box>
        <Typography className={c.label}>Депозит</Typography>
        <Typography className={c.value}>
          <Currency value={amount} currencyId={currencyId} />
        </Typography>
      </Box>

      <Box>
        {payoutDate && (
          <Typography className={c.value}>
            Завершен <br />
            <FDate date={payoutDate} />
          </Typography>
        )}

        {!payoutDate && isReady && (
          <Typography className={c.value}>
            Готов <br /> к выводу
          </Typography>
        )}

        {!payoutDate && !isReady && (
          <Typography className={c.value} style={{ color: '#3B6EE4' }}>
            <Timer
              initialTime={new Date(endsAt).getTime() - Date.now()}
              direction='backward'
              formatValue={v => `${v < 10 ? '0' : ''}${v}`}
              onStop={() => refetchInvestment()}
            >
              {() => (
                <React.Fragment>
                  <Timer.Days formatValue={value => value.toString()} />{' '}
                  {plural(
                    moment(new Date(endsAt)).diff(moment(), 'days'),
                    'день',
                    'дня',
                    'дней'
                  )}{' '}
                  <br />
                  <Timer.Hours />:
                  <Timer.Minutes />:
                  <Timer.Seconds />
                </React.Fragment>
              )}
            </Timer>
          </Typography>
        )}
      </Box>

      <Box color='grey.400'>
        <Typography className={c.value}>
          <FDate date={createdAt} /> <br />
          {new Date(createdAt).toLocaleTimeString()}
        </Typography>
      </Box>

      <Box>
        <Typography className={c.label}>Выплата</Typography>
        <Currency value={estimatedPayoutAmount} currencyId={currencyId} />
      </Box>

      {!payoutDate && (
        <Box>
          <Button
            color='primary'
            variant='contained'
            size='small'
            disabled={!isReady || payouting}
            onClick={handlePayout}
          >
            Вывести
          </Button>
        </Box>
      )}
    </Paper>
  )
}
