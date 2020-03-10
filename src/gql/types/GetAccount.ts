/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAccount
// ====================================================

export interface GetAccount_account {
  __typename: "AccountEntity";
  id: string;
  displayName: string | null;
  picture: string | null;
}

export interface GetAccount {
  account: GetAccount_account;
}
