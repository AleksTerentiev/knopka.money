/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AffiliateAccruals
// ====================================================

export interface AffiliateAccruals_affiliateAccruals_referral {
  __typename: "AccountEntity";
  id: string;
  displayName: string;
  picture: string;
}

export interface AffiliateAccruals_affiliateAccruals {
  __typename: "AffiliateAccrualOperationEntity";
  id: string;
  createdAt: any;
  currencyId: string;
  amount: string;
  rate: string;
  referral: AffiliateAccruals_affiliateAccruals_referral;
}

export interface AffiliateAccruals {
  affiliateAccruals: AffiliateAccruals_affiliateAccruals[];
}
