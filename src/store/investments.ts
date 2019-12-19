import gql from 'graphql-tag';
import { CurrencyType } from 'store/balances';

export type InvestmentTariffType = 'BASIC';

export interface Investment {
  id: string;
  createdAt: string;
  investmentTariffId: InvestmentTariffType;
  amount: number;
  rate: string;
  currencyId: CurrencyType;
  endsAt: string;
  isReady: boolean;
  estimatedPayoutAmount: string;
  actualPayoutAmount?: string;
  payoutDate?: string;
}

export interface InvestmentsData {
  investments: Investment[];
}

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
  query Investments {
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
