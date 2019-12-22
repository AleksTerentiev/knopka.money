/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: InvestmentData
// ====================================================

export interface InvestmentData {
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
