import gql from 'graphql-tag';

export interface Balance {
  currencyId: string;
  amount: string;
}

export interface BalancesData {
  balances: Balance[];
}

export const GET_BALANCES = gql`
  query Balance {
    balances {
      currencyId
      amount
    }
  }
`;
