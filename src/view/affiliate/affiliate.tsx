import React, { ChangeEvent, useState, useMemo } from 'react'
import { Box, Typography, Tabs, Tab, Divider } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import { Share } from 'view/affiliate/share'
import { Currency } from 'view/billing/currency'
import { Referrals } from 'view/affiliate/referrals'
import { Accruals } from 'view/affiliate/accruals'
import { GET_AFFILIATE_REFERRALS, GET_AFFILIATE_TOTALS } from 'queries'
import { GetAffiliateReferrals } from 'gql-types/GetAffiliateReferrals'
import { GetAffiliateTotals } from 'gql-types/GetAffiliateTotals'
import { useStyles } from './affiliate.c'

export const Affiliate = () => {
  const c = useStyles({})
  const { data: totalsData } = useQuery<GetAffiliateTotals>(GET_AFFILIATE_TOTALS)
  const totals = totalsData?.affiliateTotals || []
  const { data: referralsData } = useQuery<GetAffiliateReferrals>(GET_AFFILIATE_REFERRALS)
  const referrals = referralsData?.affiliateReferrals || []
  const [currentTab, setCurrentTab] = useState('referrals')

  function handleTabChange(e: ChangeEvent<{}>, tab: string) {
    setCurrentTab(tab)
  }

  const total = useMemo(
    () => totals.reduce((total, curTotal) => total + Number(curTotal.total), 0),
    [totals]
  )

  return (
    <Box className={c.root}>
      <Box>
        <Typography variant='h2' className={c.header}>
          Зарабатывайте <span className={c.profit}>30%</span>
          <br />
          Приглашая Друзей
        </Typography>
        <Typography className={c.subtitle}>
          Делитесь ссылкой и зарабатывайте <br />
          30% прибыли каждого пришедшего
        </Typography>
        <Share />
      </Box>

      <Box>
        <Typography variant='h3'>Рефералы</Typography>

        {referrals.length >= 0 ? (
          <>
            <Tabs
              className={c.tabs}
              value={currentTab}
              onChange={handleTabChange}
              TabIndicatorProps={{ hidden: true }}
            >
              <Tab
                label={`Рефералы (${referrals.length.toLocaleString()})`}
                value='referrals'
              />
              <Tab label={`Выплаты (+${total.toLocaleString()}₽)`} value='totals' />
            </Tabs>
            <Divider className={c.divider} />
            <Box className={c.tabsContent}>
              {currentTab === 'referrals' && <Referrals />}
              {currentTab === 'totals' && <Accruals />}
            </Box>
          </>
        ) : (
          <Box fontWeight='fontWeightMedium' color='text.hint' mt={1}>
            <Typography>У вас еще нет рефералов</Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}
