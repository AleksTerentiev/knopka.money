/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBalances
// ====================================================

export interface GetBalances_balances {
  __typename: "AccountBalanceEntity";
  currencyId: string;
  amount: string;
}

export interface GetBalances {
  balances: GetBalances_balances[];
}
