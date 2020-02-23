import React from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  Paper,
  Box,
  Typography,
  Button,
} from '@material-ui/core'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Currency } from 'view/billing/currency'
import Timer from 'react-compound-timer'
import { CLOSE_INVESTMENT, GET_BALANCES } from 'queries'
import { GetBalances } from 'gql-types/GetBalances'
import { InvestmentData } from 'gql-types/InvestmentData'

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
      <Box className={c.column}>
        <Typography>Id: {id}</Typography>
        <Typography variant='caption'>{new Date(createdAt).toLocaleString()}</Typography>
      </Box>

      <Box className={c.column}>
        <Typography className={c.label}>Депозит</Typography>
        <Currency amount={amount} currencyId={currencyId} className={c.value} />
      </Box>

      <Box className={c.column}>
        <Typography className={c.label}>Выплата</Typography>
        <Currency
          amount={estimatedPayoutAmount}
          currencyId={currencyId}
          className={c.value}
        />
      </Box>

      <Box className={c.column}>
        {isReady && !payoutDate && (
          <Button
            color='primary'
            variant='contained'
            disabled={payouting}
            onClick={handlePayout}
          >
            Забрать
          </Button>
        )}

        {isReady && payoutDate && (
          <>
            <Typography className={c.label}>Статус</Typography>
            <Typography>Завершен</Typography>
          </>
        )}

        {!isReady && !payoutDate && (
          <>
            <Typography className={c.label}>Осталось</Typography>
            <Typography className={c.value}>
              <Timer
                initialTime={new Date(endsAt).getTime() - Date.now()}
                direction='backward'
                formatValue={v => `${v < 10 ? '0' : ''}${v}`}
                // TODO: request investment when timer ends ?
              >
                {() => (
                  <React.Fragment>
                    <Timer.Hours />:
                    <Timer.Minutes />:
                    <Timer.Seconds />
                  </React.Fragment>
                )}
              </Timer>
            </Typography>
          </>
        )}
      </Box>
    </Paper>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: '1px 1px 5px 0px rgba(0,0,0,0.2)',
      padding: theme.spacing(3),
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    column: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(1.5),
      flexGrow: 1,
    },
    label: {
      color: '#444',
      fontSize: '0.9rem',
      marginBottom: 2,
    },
    value: {
      fontSize: '1.12rem',
    },
  })
)
