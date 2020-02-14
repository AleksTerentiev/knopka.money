import React from 'react'
import { makeStyles, Theme, createStyles, Box, Typography } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import { Share } from 'view/affiliate/share'
import { Currency } from 'view/billing/currency'
import { Referrals } from 'view/affiliate/referrals'
import { Accruals } from 'view/affiliate/accruals'
import { GET_AFFILIATE_REFERRALS, GET_AFFILIATE_TOTALS } from 'queries'
import { GetAffiliateReferrals } from 'gql-types/GetAffiliateReferrals'
import { GetAffiliateTotals } from 'gql-types/GetAffiliateTotals'

export const Affiliate = () => {
  const c = useStyles({})

  const { data: totalsData } = useQuery<GetAffiliateTotals>(GET_AFFILIATE_TOTALS)
  const totals = totalsData ? totalsData.affiliateTotals : []
  const { data } = useQuery<GetAffiliateReferrals>(GET_AFFILIATE_REFERRALS)
  const referrals = data ? data.affiliateReferrals : []

  return (
    <Box className={c.root}>
      <Box className={c.header} pt={6} pb={5}>
        <span className={c.headerImage} role='img' aria-label='Prize'>
          🎁
        </span>
        <Typography variant='h3' style={{ marginBottom: 3 }}>
          Партнерская программа
        </Typography>
        <Typography variant='subtitle1' gutterBottom>
          Приглашайте друзей и зарабатывайте{' '}
          <Typography display='inline' variant='h5' color='error' component='span'>
            30%
          </Typography>{' '}
          от прибыли за каждого из них
        </Typography>

        <Box mt={2}>
          <Share />
        </Box>
      </Box>

      <Box className={c.infoContainer}>
        <Box className={c.infoBlock}>
          <Typography className={c.total}>{referrals.length.toLocaleString()}</Typography>
          <Typography variant='h5' gutterBottom>
            рефералы
          </Typography>
          <Box p={1} />
          <Referrals />
        </Box>
        <Box className={c.infoBlock}>
          {totals.length > 0 && (
            <Typography className={c.total}>
              {totals.map(total => (
                <Currency
                  key={total.currencyId}
                  amount={total.total}
                  currencyId={total.currencyId}
                />
              ))}
            </Typography>
          )}
          <Typography variant='h5' gutterBottom>
            выплаты
          </Typography>
          <Box p={1} />
          <Accruals />
        </Box>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    header: {
      display: 'flex',
      alignItems: 'stretch',
      flexDirection: 'column',
      textAlign: 'center',
      background: '#ff000010',
    },
    headerImage: {
      fontSize: '4.5rem',
      lineHeight: '4.5rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '5rem',
        lineHeight: '5rem',
      },
    },
    infoContainer: {
      textAlign: 'center',
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      display: 'grid',
      gridTemplateRows: 'auto auto',
      gridTemplateColumns: 'auto',
      [theme.breakpoints.up('md')]: {
        gridTemplateRows: 'auto',
        gridTemplateColumns: '50% 50%',
      },
    },
    infoBlock: {
      padding: theme.spacing(2),
    },
    total: {
      fontSize: '2.2rem',
      lineHeight: '2.2rem',
      marginBottom: theme.spacing(0.5),
    },
  })
)
