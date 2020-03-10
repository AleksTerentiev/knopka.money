import React, { FC } from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  Avatar,
  Typography,
} from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import { Currency } from 'view/billing/currency'
import { GET_AFFILIATE_REFERRALS } from 'gql/queries'
import { GetAffiliateReferrals } from 'gql/types/GetAffiliateReferrals'

export const Referrals: FC = () => {
  const c = useStyles({})

  const { data } = useQuery<GetAffiliateReferrals>(GET_AFFILIATE_REFERRALS)
  const referrals = data ? data.affiliateReferrals : []

  return (
    <Box className={c.root}>
      {referrals.map(referral => (
        <Box className={c.referral} key={referral.id}>
          <Box display='flex' alignItems='center' justifyContent='center'>
            <Avatar className={c.avatar} src={referral.picture || undefined} />
            <Typography align='left' variant='body2'>
              {referral.displayName}
            </Typography>
          </Box>
          {referral.totals.map((total, index) => (
            <Typography variant='body2' key={index} className={c.total}>
              +<Currency rubRight value={total.total} currencyId={total.currencyId} />
            </Typography>
          ))}
        </Box>
      ))}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    referral: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: theme.spacing(2, 0),
      [theme.breakpoints.up('sm')]: {
        margin: theme.spacing(2.5, 0),
      },
    },
    avatar: {
      width: 40,
      height: 40,
      marginRight: theme.spacing(1.5),
      [theme.breakpoints.up('sm')]: {
        width: 50,
        height: 50,
        marginRight: theme.spacing(2),
      },
    },
    total: {
      color: '#3B6EE4',
    },
  })
)
