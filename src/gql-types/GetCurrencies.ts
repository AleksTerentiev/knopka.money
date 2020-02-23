/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCurrencies
// ====================================================

export interface GetCurrencies_currencies {
  __typename: "CurrencyEntity";
  id: string;
  template: string;
}

export interface GetCurrencies {
  currencies: GetCurrencies_currencies[];
}
