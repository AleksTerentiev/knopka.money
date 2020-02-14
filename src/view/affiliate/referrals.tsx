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
import { GET_AFFILIATE_REFERRALS } from 'queries'
import { GetAffiliateReferrals } from 'gql-types/GetAffiliateReferrals'

export const Referrals: FC = () => {
  const c = useStyles({})

  const { data } = useQuery<GetAffiliateReferrals>(GET_AFFILIATE_REFERRALS)
  const referrals = data ? data.affiliateReferrals : []

  return (
    <Box className={c.root}>
      {referrals.map(referral => (
        <Box className={c.referral} key={referral.id}>
          <Box display='flex' alignItems='center' justifyContent='center'>
            <Avatar className={c.avatar} src={referral.picture} alt='Аватар' />
            <Typography className={c.name} align='left' variant='body1'>
              {referral.displayName}
            </Typography>
          </Box>
          {referral.totals.map((total, index) => (
            <Currency
              key={index}
              className={c.total}
              amount={total.total}
              currencyId={total.currencyId}
            />
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
      padding: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    avatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      marginRight: theme.spacing(1.5),
    },
    name: {
      fontSize: '1.1rem',
    },
    total: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '1.35rem',
    },
  })
)
