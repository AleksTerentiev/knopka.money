import React from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  Card,
  Box,
  Typography,
  Button,
  useMediaQuery,
} from '@material-ui/core'
import { useGlobalStyles } from 'styles'
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
import clsx from 'clsx'

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
  const gc = useGlobalStyles({})
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

  const miniWidth = useMediaQuery('(max-width:359px)')

  return (
    <Card className={clsx(c.root, gc.cardDense)}>
      <Box>
        <Typography className={gc.cardLabel}>Id</Typography>
        <Typography className={gc.cardValue}>{id}</Typography>
      </Box>

      <Box>
        <Typography className={gc.cardLabel}>Депозит</Typography>
        <Typography className={gc.cardValue}>
          <Currency value={amount} currencyId={currencyId} />
        </Typography>
      </Box>

      <Box>
        {payoutDate && (
          <Typography className={gc.cardValue}>
            Завершен <br />
            <FDate date={payoutDate} />
          </Typography>
        )}

        {!payoutDate && isReady && (
          <Typography className={gc.cardValue}>
            Готов <br /> к выводу
          </Typography>
        )}

        {!payoutDate && !isReady && (
          <Typography className={gc.cardValue} style={{ color: '#3B6EE4' }}>
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
        <Typography className={gc.cardValue}>
          <FDate date={createdAt} /> <br />
          {new Date(createdAt).toLocaleTimeString()}
        </Typography>
      </Box>

      <Box>
        <Typography className={gc.cardLabel}>Выплата</Typography>
        <Typography className={gc.cardValue}>
          <Currency value={estimatedPayoutAmount} currencyId={currencyId} />
        </Typography>
      </Box>

      {!payoutDate && (
        <Box>
          <Button
            color='primary'
            variant='contained'
            size='small'
            disabled={!isReady || payouting}
            onClick={handlePayout}
            fullWidth
          >
            {miniWidth ? 'Вывод' : 'Вывести'}
          </Button>
        </Box>
      )}
    </Card>
  )
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridRowGap: theme.spacing(1),
      gridColumnGap: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        gridRowGap: theme.spacing(2),
        gridColumnGap: theme.spacing(3),
      },
    },
  })
)
