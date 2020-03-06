import React, { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GetPayouts } from 'gql-types/GetPayouts'
import { GET_PAYOUTS } from 'queries'
import {
  createStyles,
  makeStyles,
  Theme,
  Box,
  Card,
  Typography,
  Divider,
} from '@material-ui/core'
import clsx from 'clsx'
import { useGlobalStyles } from 'styles'
import { Currency } from 'view/billing/currency'
import { FDate } from 'view/fdate'
import { orderBy } from 'lodash'

export const PayoutsList = () => {
  const gc = useGlobalStyles({})
  const c = useStyles({})
  const { data } = useQuery<GetPayouts>(GET_PAYOUTS)

  const payouts = useMemo(() => {
    return orderBy(data?.payouts, ['createdAt'], ['desc'])
  }, [data])

  return (
    <Box>
      <Typography variant='h3' gutterBottom={payouts.length > 0}>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <span>История</span>
          <span className={c.count}>{payouts.length || ''}</span>
        </Box>
      </Typography>
      {payouts.length > 0 ? (
        <Box mt={1}>
          <Divider className={c.divider} />
          <Box className={c.payouts}>
            {payouts.map(payout => (
              <Card className={clsx(c.payout, gc.cardDense)} key={payout.id}>
                <Box>
                  <Typography className={gc.cardLabel}>Дата</Typography>
                  <Box color='grey.400'>
                    <Typography className={gc.cardValue}>
                      {<FDate date={payout.createdAt} />}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography className={gc.cardLabel}>Сумма</Typography>
                  <Typography className={gc.cardValue}>
                    <Currency
                      value={payout.amount}
                      fraction={0}
                      currencyId={payout.currencyId}
                    />
                  </Typography>
                </Box>
                <Box>
                  <Typography className={gc.cardLabel}>Статус</Typography>
                  <Typography className={gc.cardValue}>
                    {payout.isSuccess ? 'Проведен' : 'В обработке'}
                  </Typography>
                </Box>
                {payout.operatorComment && (
                  <Box className={c.comment}>
                    <Typography className={gc.cardLabel}>Примечание</Typography>
                    <Box className={clsx(c.commentField, gc.cardValue)}>
                      {payout.operatorComment}
                    </Box>
                  </Box>
                )}
              </Card>
            ))}
          </Box>
        </Box>
      ) : (
        <Box fontWeight='fontWeightMedium' color='text.hint' mt={1}>
          <Typography>Выводов не найдено</Typography>
        </Box>
      )}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    divider: {
      display: 'none',
      [theme.breakpoints.up('lg')]: {
        marginBottom: theme.spacing(4),
        display: 'block',
      },
    },
    count: {
      color: theme.palette.grey[500],
    },
    payouts: {
      [theme.breakpoints.up('lg')]: {
        maxHeight: 620,
        overflowY: 'scroll',
      },
    },
    payout: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridTemplateRows: 'auto auto',
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        gridColumnGap: theme.spacing(3),
      },
    },
    comment: {
      gridColumn: '1 / 4',
    },
    commentField: {
      whiteSpace: 'normal',
      background: theme.palette.grey[100],
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(1, 2),
      marginTop: theme.spacing(1),
    },
  })
)
