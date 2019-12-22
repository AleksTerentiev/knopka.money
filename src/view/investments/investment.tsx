import React, { FC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Investment as IInvestment, CLOSE_INVESTMENT } from 'store/investments';
import { BalancesData, GET_BALANCES } from 'store/balances';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Currency } from 'view/currency';
import Timer from 'react-compound-timer';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export interface InvestmentProps {
  investment: IInvestment;
}

export const Investment: FC<InvestmentProps> = ({
  investment: { id, amount, currencyId, estimatedPayoutAmount, createdAt, endsAt, isReady, payoutDate },
}) => {
  const c = useStyles({});
  const { refetch: refetchBalances } = useQuery<BalancesData>(GET_BALANCES);

  const [closeInvestment, { loading: payouting }] = useMutation(CLOSE_INVESTMENT, {
    async onCompleted() {
      await refetchBalances();
    },
  });

  async function handlePayout() {
    await closeInvestment({ variables: { id } });
  }

  return (
    <Paper className={c.root}>
      <Box className={c.column}>
        <Typography>Id: {id}</Typography>
        <Typography variant="caption">{new Date(createdAt).toLocaleString()}</Typography>
      </Box>

      <Box className={c.column}>
        <Typography className={c.label}>Депозит</Typography>
        <Currency amount={amount} currencyId={currencyId} className={c.value} />
      </Box>

      <Box className={c.column}>
        <Typography className={c.label}>Выплата</Typography>
        <Currency amount={estimatedPayoutAmount} currencyId={currencyId} className={c.value} />
      </Box>

      <Box className={c.column}>
        {isReady && !payoutDate && (
          <Button color="primary" variant="contained" size="large" disabled={payouting} onClick={handlePayout}>
            Забрать
          </Button>
        )}

        {isReady && payoutDate && (
          <>
            <Typography className={c.label}>Статус</Typography>
            <Typography>Завершен</Typography>
          </>
        )}

        {!isReady && !payoutDate && (
          <>
            <Typography className={c.label}>Осталось</Typography>
            <Typography className={c.value}>
              <Timer
                initialTime={new Date(endsAt).getTime() - Date.now()}
                direction="backward"
                formatValue={v => `${v < 10 ? '0' : ''}${v}`}
                // TODO: request investment when timer ends ?
              >
                {() => (
                  <React.Fragment>
                    <Timer.Hours />:
                    <Timer.Minutes />:
                    <Timer.Seconds />
                  </React.Fragment>
                )}
              </Timer>
            </Typography>
          </>
        )}
      </Box>
    </Paper>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: '1px 1px 5px 0px rgba(0,0,0,0.2)',
      padding: theme.spacing(3),
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    column: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(1.5),
      flexGrow: 1
    },
    label: {
      color: '#444',
      fontSize: '0.9rem',
      marginBottom: 2,
    },
    value: {
      fontSize: '1.12rem',
    },
  })
);
