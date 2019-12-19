import React, { FC, useState, useMemo } from 'react';
import { navigate } from '@reach/router';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { InvestmentTariffType, CREATE_INVESTMENT, GET_INVESTMENTS } from 'store/investments';
import { CurrencyType, BalancesData, GET_BALANCES } from 'store/balances';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';
import bgImg from './img/bg.png';

export const CreateInvestment: FC = () => {
  const investmentTariffId: InvestmentTariffType = 'BASIC';
  const currencyId: CurrencyType = 'RUB';
  const amountMin = 100;

  const c = useStyles({});
  const [amount, setAmount] = useState('');
  const [notEnoughtMoney, setNotEnoughtMoney] = useState();
  const [errorText, setErrorText] = useState();
  const { data: balancesData, refetch: refetchBalances } = useQuery<BalancesData>(GET_BALANCES);
  const balance = useMemo(() => balancesData && _.find(balancesData.balances, { currencyId }), [balancesData]);

  const [createInvestment, { loading: creating }] = useMutation(CREATE_INVESTMENT, {
    update(cache, { data: { createInvestment } }) {
      const cachedData: any = cache.readQuery({ query: GET_INVESTMENTS });
      cache.writeQuery({
        query: GET_INVESTMENTS,
        data: { investments: [...cachedData.investments, createInvestment] },
      });
    },
    onCompleted({ createInvestment }) {
      setAmount('');
      refetchBalances();
    },
  });

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.value);
    const notEnoughtMoney = !!balance && Number(balance.amount) < Number(e.target.value);
    setNotEnoughtMoney(notEnoughtMoney);
    setErrorText(notEnoughtMoney ? 'Недостаточно средств' : '');
  }

  function handleSubmitClick(e: React.FormEvent) {
    e.preventDefault();
    if (Number(amount) < amountMin) {
      return setErrorText(`Минимальная сумма - ${amountMin}₽`);
    }
    createInvestment({ variables: { amount: Number(amount), currencyId, investmentTariffId } });
  }

  return (
    <Paper className={c.root}>
      <Box px={3} pt={4} pb={5}>
        <Typography variant="h4">Инвестировать</Typography>
        <form className={c.form} onSubmit={handleSubmitClick}>
          <TextField
            type="number"
            label={errorText || 'Сумма, ₽'}
            variant="outlined"
            fullWidth
            className={c.amountInput}
            style={{ background: 'white' }}
            inputProps={{ min: 0 }}
            error={!!errorText}
            value={amount}
            onChange={handleAmountChange}
            // helperText={errorText}
            // autoFocus
            // margin='dense'
            // InputLabelProps={{
            //   shrink: true,
            // }}
          />
          {notEnoughtMoney ? (
            <Button color="primary" variant="text" fullWidth onClick={() => navigate('/refill')}>
              Пополнить баланс
            </Button>
          ) : (
            <Button type="submit" disabled={creating} color="primary" size="large" variant="contained" fullWidth>
              Инвестировать
            </Button>
          )}
        </form>
      </Box>
    </Paper>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: '1px 1px 5px 0px rgba(0,0,0,0.3)',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: `url(${bgImg})`,
      backgroundSize: 'contain',
    },
    form: {
      width: '100%',
      '@media (min-width: 400px)': {
        width: 280,
        margin: 'auto',
      },
    },
    amountInput: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(1.5),
    },
    inputField: {
      background: 'white',
    },
  })
);
