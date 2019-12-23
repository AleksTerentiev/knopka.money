import React, { FC, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CurrencyType, BalancesData, GET_BALANCES } from 'store/balances';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const CREATE_INVOICE = gql`
  mutation CreateInvoice($amount: Float!, $currencyId: String!) {
    createInvoice(data: { amount: $amount, currencyId: $currencyId }) {
      id
      accountId
      amount
      currencyId
    }
  }
`;

export const Refill: FC<RouteComponentProps> = () => {
  const currencyId: CurrencyType = 'RUB';

  const c = useStyles({});
  const [amount, setAmount] = useState('');
  const { refetch: refetchBalances } = useQuery<BalancesData>(GET_BALANCES);

  const [createInvestment, { loading: creating }] = useMutation(CREATE_INVOICE, {
    onCompleted({ createInvestment }) {
      setAmount('');
      refetchBalances();
    },
  });

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.value);
  }

  function handleSubmitClick(e: React.FormEvent) {
    e.preventDefault();
    if (!amount) {
      return;
    }
    createInvestment({ variables: { amount: Number(amount), currencyId } });
  }

  return (
    <Box py={2}>
      <Container>
        <Paper className={c.root}>
          <Box px={3} pt={4} pb={5}>
            <Typography variant="h4">Пополнить счет</Typography>
            <form className={c.form} onSubmit={handleSubmitClick}>
              <TextField
                type="number"
                label={'Сумма, ₽'}
                variant="outlined"
                fullWidth
                className={c.amountInput}
                style={{ background: 'white' }}
                inputProps={{ min: 0 }}
                value={amount}
                onChange={handleAmountChange}
              />
              <Button type="submit" disabled={creating} color="primary" size="large" variant="contained" fullWidth>
                Пополнить
              </Button>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: '1px 1px 5px 0px rgba(0,0,0,0.3)',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
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
