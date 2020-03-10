import React from 'react'
import { usePayouts } from 'gql'
import {
  createStyles,
  makeStyles,
  Theme,
  useMediaQuery,
  Box,
  Card,
  Typography,
  Divider,
} from '@material-ui/core'
import clsx from 'clsx'
import { useGlobalStyles } from 'styles'
import { Currency } from 'view/billing/currency'
import { FDate } from 'view/fdate'

export const PayoutsList = () => {
  const gc = useGlobalStyles({})
  const c = useStyles({})
  const down340px = useMediaQuery('(max-width: 340px)')

  const { payouts } = usePayouts()

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
                      value={Math.abs(payout.amount)}
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
                <Box className={c.details}>
                  <Typography className={gc.cardLabel}>Реквизиты</Typography>
                  <Typography className={gc.cardValue} style={{ whiteSpace: 'normal' }}>
                    {down340px ? payout.details.replace(/ /g, '') : payout.details}
                  </Typography>
                </Box>
                <Box className={c.payoutMethod}>
                  <Typography className={gc.cardLabel}>Платежка</Typography>
                  <Typography className={gc.cardValue}>
                    {payout.payoutMethodId === 'VISA/MASTERCARD'
                      ? 'VISA/MASTER'
                      : payout.payoutMethodId}
                  </Typography>
                </Box>
                {payout.operatorComment && (
                  <Box className={c.comment}>
                    <Typography className={gc.cardLabel}>Примечание</Typography>
                    <Typography className={clsx(c.commentField, gc.cardValue)}>
                      {payout.operatorComment}
                    </Typography>
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
    details: {
      gridColumn: '1 / 3',
    },
    payoutMethod: {},
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
