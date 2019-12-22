import gql from 'graphql-tag';

export const GET_ACCOUNT = gql`
  query GetAccount {
    account {
      id
      displayName
      picture
    }
  }
`;
export const GET_BALANCES = gql`
  query GetBalances {
    balances {
      currencyId
      amount
    }
  }
`;
export const INVESTMENT_DATA = gql`
  fragment InvestmentData on InvestmentViewEntity {
    id
    createdAt
    investmentTariffId
    amount
    rate
    currencyId
    endsAt
    isReady
    estimatedPayoutAmount
    actualPayoutAmount
    payoutDate
  }
`;
export const GET_INVESTMENTS = gql`
  query GetInvestments {
    investments {
      ...InvestmentData
    }
  }
  ${INVESTMENT_DATA}
`;
export const CREATE_INVESTMENT = gql`
  mutation CreateInvestment($amount: Float!, $currencyId: String!, $investmentTariffId: String!) {
    createInvestment(data: { amount: $amount, currencyId: $currencyId, investmentTariffId: $investmentTariffId }) {
      ...InvestmentData
    }
  }
  ${INVESTMENT_DATA}
`;
export const CLOSE_INVESTMENT = gql`
  mutation CloseInvestment($id: String!) {
    closeInvestment(id: $id) {
      ...InvestmentData
    }
  }
  ${INVESTMENT_DATA}
`;
