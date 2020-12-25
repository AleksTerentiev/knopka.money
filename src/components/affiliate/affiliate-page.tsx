import React, { ChangeEvent, useState, useMemo } from 'react';
import { useAffiliateTotals, useAffiliateReferrals } from 'gql';
import { Box, Typography, Tabs, Tab, Divider } from '@material-ui/core';
import { useGlobalStyles } from 'styles';
import { useStyles } from './affiliate-page.c';
import { Share } from 'components/affiliate/share';
import { Referrals } from 'components/affiliate/referrals';
import { Accruals } from 'components/affiliate/accruals';

export const AffiliatePage = () => {
  const gc = useGlobalStyles();
  const c = useStyles();
  const { affiliateTotals } = useAffiliateTotals();
  const { affiliateReferrals } = useAffiliateReferrals();
  const [currentTab, setCurrentTab] = useState('referrals');

  function handleTabChange(e: ChangeEvent<{}>, tab: string) {
    setCurrentTab(tab);
  }

  const total = useMemo(
    () => affiliateTotals.reduce((total, curTotal) => total + Number(curTotal.total), 0),
    [affiliateTotals]
  );

  return (
    <Box className={gc.page}>
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

        {affiliateReferrals.length > 0 ? (
          <>
            <Tabs className={c.tabs} value={currentTab} onChange={handleTabChange}>
              <Tab
                label={`Рефералы (${affiliateReferrals.length.toLocaleString()})`}
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
  );
};
