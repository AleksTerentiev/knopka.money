/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetInvestments
// ====================================================

export interface GetInvestments_investments {
  __typename: "InvestmentViewEntity";
  id: string;
  createdAt: any;
  investmentTariffId: string;
  amount: number;
  rate: string;
  currencyId: string;
  endsAt: any;
  isReady: boolean;
  /**
   * Предполагаемая сумма выплаты
   */
  estimatedPayoutAmount: string;
  /**
   * Реальная сумма выплаты. Если null - значит депозит ещё не закрыт
   */
  actualPayoutAmount: string | null;
  payoutDate: any | null;
}

export interface GetInvestments {
  investments: GetInvestments_investments[];
}
