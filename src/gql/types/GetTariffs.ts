/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTariffs
// ====================================================

export interface GetTariffs_tariffs_constraints {
  __typename: "InvestmentConstraintEntity";
  currencyId: string;
  minAmount: string;
  maxAmount: string;
}

export interface GetTariffs_tariffs {
  __typename: "InvestmentTariffViewEntity";
  id: string;
  /**
   * На сколько процентов увеличится депозит на момент окончания
   */
  percent: number;
  /**
   * Длительность депозита в днях
   */
  days: number;
  /**
   * Ограничения депозита в разных валютах
   */
  constraints: GetTariffs_tariffs_constraints[];
}

export interface GetTariffs {
  tariffs: GetTariffs_tariffs[];
}
