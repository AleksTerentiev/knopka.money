/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PayoutData
// ====================================================

export interface PayoutData {
  __typename: "PayoutEntity";
  id: string;
  createdAt: any;
  accountId: string;
  currencyId: string;
  amount: number;
  payoutMethodId: string;
  /**
   * Если null - вывод ещё не обработан.
   */
  isSuccess: boolean | null;
  /**
   * Комментарий от оператора, который производил вывод.
   */
  operatorComment: string | null;
  /**
   * Реквизиты, на которые надо вывести. В свободной форме.
   */
  details: string;
}
