/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AffiliateReferrals
// ====================================================

export interface AffiliateReferrals_affiliateReferrals_totals {
  __typename: "AffiliateReferralCurrencyTotal";
  currencyId: string;
  total: string;
}

export interface AffiliateReferrals_affiliateReferrals {
  __typename: "AffiliateReferral";
  id: string;
  displayName: string;
  picture: string;
  totals: AffiliateReferrals_affiliateReferrals_totals[];
}

export interface AffiliateReferrals {
  affiliateReferrals: AffiliateReferrals_affiliateReferrals[];
}
