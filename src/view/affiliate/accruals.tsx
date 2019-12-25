import React, { FC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { AffiliateAccrualsData, GET_AFFILIATE_ACCRUALS } from 'store/affiliate';
import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Currency } from 'view/billing/currency';

export const Accruals: FC = () => {
  const c = useStyles({});

  const { data } = useQuery<AffiliateAccrualsData>(GET_AFFILIATE_ACCRUALS);
  const accruals = data ? data.affiliateAccruals : [];

  return (
    <Box className={c.root}>
      {accruals &&
        accruals.length > 0 &&
        accruals.map(accrual => (
          <Box key={accrual.id} className={c.accrual}>
            <Typography variant="caption">{new Date(accrual.createdAt).toLocaleDateString()}</Typography>
            <Box className={c.referral}>
              <Avatar className={c.referralAvatar} src={accrual.referral.picture} alt="Аватар" />
              <Typography variant="body2">{accrual.referral.displayName}</Typography>
            </Box>
            {/* <Typography>{Number(accrual.rate) * 100}%</Typography> */}
            <Currency className={c.total} amount={accrual.amount} currencyId={accrual.currencyId} />
          </Box>
        ))}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    accrual: {
      padding: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    referral: {
      display: 'flex',
      alignItems: 'center',
    },
    referralAvatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: theme.spacing(1),
    },
    total: {},
  })
);