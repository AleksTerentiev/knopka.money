import gql from 'graphql-tag'

export const GET_TARIFFS = gql`
  query GetTariffs {
    tariffs {
      id
      percent
      days
      constraints {
        currencyId
        minAmount
        maxAmount
      }
    }
  }
`
export const GET_CURRENCIES = gql`
  query GetCurrencies {
    currencies {
      id
      template
    }
  }
`
export const GET_ACCOUNT = gql`
  query GetAccount {
    account {
      id
      displayName
      picture
    }
  }
`
export const GET_BALANCES = gql`
  query GetBalances {
    balances {
      currencyId
      amount
    }
  }
`
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
`
export const GET_INVESTMENT = gql`
  query GetInvestment($id: String!) {
    investment(id: $id) {
      ...InvestmentData
    }
  }
  ${INVESTMENT_DATA}
`
export const GET_INVESTMENTS = gql`
  query GetInvestments {
    investments {
      ...InvestmentData
    }
  }
  ${INVESTMENT_DATA}
`
export const CREATE_INVESTMENT = gql`
  mutation CreateInvestment(
    $amount: Float!
    $currencyId: String!
    $investmentTariffId: String!
  ) {
    createInvestment(
      data: {
        amount: $amount
        currencyId: $currencyId
        investmentTariffId: $investmentTariffId
      }
    ) {
      ...InvestmentData
    }
  }
  ${INVESTMENT_DATA}
`
export const CLOSE_INVESTMENT = gql`
  mutation CloseInvestment($id: String!) {
    closeInvestment(id: $id) {
      ...InvestmentData
    }
  }
  ${INVESTMENT_DATA}
`
export const CREATE_INVOICE = gql`
  mutation CreateInvoice($amount: Float!, $currencyId: String!) {
    createInvoice(data: { amount: $amount, currencyId: $currencyId }) {
      id
      accountId
      amount
      currencyId
    }
  }
`
export const AFFILIATE_BIND = gql`
  mutation AffiliateBind($referrerId: String!) {
    affiliateBind(referrerId: $referrerId)
  }
`
export const GET_AFFILIATE_TOTALS = gql`
  query GetAffiliateTotals {
    affiliateTotals {
      currencyId
      total
    }
  }
`
export const GET_AFFILIATE_REFERRALS = gql`
  query GetAffiliateReferrals {
    affiliateReferrals {
      id
      displayName
      picture
      totals {
        currencyId
        total
      }
    }
  }
`
export const GET_AFFILIATE_ACCRUALS = gql`
  query GetAffiliateAccruals {
    affiliateAccruals {
      id
      createdAt
      currencyId
      amount
      rate
      referral {
        id
        displayName
        picture
      }
    }
  }
`
