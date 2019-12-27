/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAffiliateReferrals
// ====================================================

export interface GetAffiliateReferrals_affiliateReferrals_totals {
  __typename: "AffiliateReferralCurrencyTotal";
  currencyId: string;
  total: string;
}

export interface GetAffiliateReferrals_affiliateReferrals {
  __typename: "AffiliateReferral";
  id: string;
  displayName: string;
  picture: string;
  totals: GetAffiliateReferrals_affiliateReferrals_totals[];
}

export interface GetAffiliateReferrals {
  affiliateReferrals: GetAffiliateReferrals_affiliateReferrals[];
}
