import React, { FC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { AffiliateReferralsData, GET_AFFILIATE_REFERRALS } from 'store/affiliate';
import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Currency } from 'view/billing/currency';

export const Referrals: FC = () => {
  const c = useStyles({});

  const { data } = useQuery<AffiliateReferralsData>(GET_AFFILIATE_REFERRALS);
  const referrals = data ? data.affiliateReferrals : [];

  return (
    <Box className={c.root}>
      {referrals.map(referral => (
        <Box className={c.referral} key={referral.id}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Avatar className={c.avatar} src={referral.picture} alt="Аватар" />
            <Typography className={c.name} align="left" variant="body1">
              {referral.displayName}
            </Typography>
          </Box>
          {referral.totals.map(total => (
            <Currency className={c.total} amount={total.total} currencyId={total.currencyId} />
          ))}
        </Box>
      ))}
    </Box>
  );
};

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
);
