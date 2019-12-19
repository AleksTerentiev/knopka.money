import gql from 'graphql-tag';

export type CurrencyType = 'USD' | 'RUB';

export interface Balance {
  currencyId: CurrencyType;
  amount: string;
}

export interface BalancesData {
  balances: Balance[];
}

export const GET_BALANCES = gql`
  query Balances {
    balances {
      currencyId
      amount
    }
  }
`;
