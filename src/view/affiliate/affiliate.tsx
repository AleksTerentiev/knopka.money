import React, { FC } from 'react';
import {
  AffiliateTotalsData,
  GET_AFFILIATE_TOTALS,
  AffiliateReferralsData,
  GET_AFFILIATE_REFERRALS,
} from 'store/affiliate';
import { RouteComponentProps } from '@reach/router';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Share } from 'view/affiliate/share';
import { Currency } from 'view/billing/currency';
import { Referrals } from 'view/affiliate/referrals';
import { Accruals } from 'view/affiliate/accruals';

export const Affiliate: FC<RouteComponentProps> = () => {
  const c = useStyles({});

  const { data: totalsData } = useQuery<AffiliateTotalsData>(GET_AFFILIATE_TOTALS);
  const totals = totalsData ? totalsData.affiliateTotals : [];
  const { data } = useQuery<AffiliateReferralsData>(GET_AFFILIATE_REFERRALS);
  const referrals = data ? data.affiliateReferrals : [];

  return (
    <Box className={c.root}>
      <Box className={c.header} pt={6} pb={5}>
        <Container>
          <span className={c.headerImage}>🎁</span>
          <Typography variant="h3" style={{ marginBottom: 3 }}>
            Партнерская программа
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Приглашайте друзей и зарабатывайте{' '}
            <Typography display="inline" variant="h5" color="error">
              30%
            </Typography>{' '}
            от прибыли за каждого из них
          </Typography>

          <Box mt={2}>
            <Share />
          </Box>
        </Container>
      </Box>

      <Container className={c.infoContainer}>
        <Box className={c.infoBlock}>
          <Typography className={c.total}>{referrals.length.toLocaleString()}</Typography>
          <Typography variant="h5" gutterBottom>
            рефералы
          </Typography>
          <Box p={1} />
          <Referrals />
        </Box>
        <Box className={c.infoBlock}>
          {totals.length > 0 && (
            <Typography className={c.total}>
              {totals.map(total => (
                <Currency key={total.currencyId} amount={total.total} currencyId={total.currencyId} />
              ))}
            </Typography>
          )}
          <Typography variant="h5" gutterBottom>
            выплаты
          </Typography>
          <Box p={1} />
          <Accruals />
        </Box>
      </Container>
    </Box>
  );
};

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
);
