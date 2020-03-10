/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InvoiceStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetInvoices
// ====================================================

export interface GetInvoices_invoices {
  __typename: "Invoice";
  id: string;
  accountId: string;
  amount: number;
  currencyId: string;
  status: InvoiceStatus;
  createdAt: any;
}

export interface GetInvoices {
  invoices: GetInvoices_invoices[];
}
