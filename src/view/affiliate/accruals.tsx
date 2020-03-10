import React, { FC } from 'react'
import { useAffiliateAccruals } from 'gql'
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  Avatar,
  Typography,
} from '@material-ui/core'
import { Currency } from 'view/billing/currency'
import { FDate } from 'view/fdate'

export const Accruals: FC = () => {
  const c = useStyles({})
  const { affiliateAccruals } = useAffiliateAccruals()

  return (
    <Box className={c.root}>
      {affiliateAccruals.map(accrual => (
        <Box key={accrual.id} className={c.accrual}>
          <Box className={c.referral}>
            <Avatar
              className={c.referralAvatar}
              src={accrual.referral.picture || undefined}
            />
            <Box>
              <Typography variant='body2'>{accrual.referral.displayName}</Typography>
              <Typography className={c.date}>
                <FDate date={accrual.createdAt} />
              </Typography>
            </Box>
          </Box>
          {/* <Typography>{Number(accrual.rate) * 100}%</Typography> */}
          <Typography variant='body2' className={c.total}>
            +<Currency rubRight value={accrual.amount} currencyId={accrual.currencyId} />
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    accrual: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: theme.spacing(2, 0),
      [theme.breakpoints.up('sm')]: {
        margin: theme.spacing(2.5, 0),
      },
    },
    referral: {
      display: 'flex',
      alignItems: 'center',
    },
    referralAvatar: {
      width: 40,
      height: 40,
      marginRight: theme.spacing(1.5),
      [theme.breakpoints.up('sm')]: {
        width: 50,
        height: 50,
        marginRight: theme.spacing(2),
      },
    },
    date: {
      color: theme.palette.text.hint,
      fontSize: 14,
      lineHeight: '20px',
      [theme.breakpoints.up('sm')]: {
        fontSize: 15,
        lineHeight: '22px',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: 16,
        lineHeight: '24px',
      },
    },
    total: {
      color: '#3B6EE4',
    },
  })
)
