/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAffiliateAccruals
// ====================================================

export interface GetAffiliateAccruals_affiliateAccruals_referral {
  __typename: "AccountEntity";
  id: string;
  displayName: string;
  picture: string;
}

export interface GetAffiliateAccruals_affiliateAccruals {
  __typename: "AffiliateAccrualOperationEntity";
  id: string;
  createdAt: any;
  currencyId: string;
  amount: string;
  rate: string;
  referral: GetAffiliateAccruals_affiliateAccruals_referral;
}

export interface GetAffiliateAccruals {
  affiliateAccruals: GetAffiliateAccruals_affiliateAccruals[];
}
