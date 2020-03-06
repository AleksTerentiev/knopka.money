/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPayoutMethods
// ====================================================

export interface GetPayoutMethods_payoutMethods {
  __typename: "PayoutMethodEntity";
  id: string;
  currencyId: string;
  rate: string;
  minAmount: string;
  maxAmount: string;
}

export interface GetPayoutMethods {
  payoutMethods: GetPayoutMethods_payoutMethods[];
}
