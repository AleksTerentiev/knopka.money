/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateInvoice
// ====================================================

export interface CreateInvoice_createInvoice {
  __typename: "Invoice";
  id: string;
  accountId: string;
  amount: number;
  currencyId: string;
}

export interface CreateInvoice {
  createInvoice: CreateInvoice_createInvoice;
}

export interface CreateInvoiceVariables {
  amount: number;
  currencyId: string;
}
