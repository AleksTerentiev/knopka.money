import gql from 'graphql-tag';
import { Account } from 'store/account';
import { CurrencyType } from 'store/balances';

/** Totals **/

export interface AffiliateTotal {
  currencyId: CurrencyType;
  total: string;
}

export interface AffiliateTotalsData {
  affiliateTotals: AffiliateTotal[];
}

export const GET_AFFILIATE_TOTALS = gql`
  query AffiliateTotals {
    affiliateTotals {
      currencyId
      total
    }
  }
`;

/** Referrals **/

export interface AffiliateReferralTotal {
  currencyId: CurrencyType;
  total: string;
}

export interface AffiliateReferral {
  id: string;
  displayName: string;
  picture: string;
  totals: AffiliateReferralTotal[];
}

export interface AffiliateReferralsData {
  affiliateReferrals: AffiliateReferral[];
}

export const GET_AFFILIATE_REFERRALS = gql`
  query AffiliateReferrals {
    affiliateReferrals {
      id
      displayName
      picture
      totals {
        currencyId
        total
      }
    }
  }
`;

/** Accruals **/

export interface AffiliateAccrual {
  id: string;
  createdAt: string;
  referral: Account;
  rate: string;
  amount: string;
  currencyId: CurrencyType;
}

export interface AffiliateAccrualsData {
  affiliateAccruals: AffiliateAccrual[];
}

export const GET_AFFILIATE_ACCRUALS = gql`
  query AffiliateAccruals {
    affiliateAccruals {
      id
      createdAt
      currencyId
      amount
      rate
      referral {
        id
        displayName
        picture
      }
    }
  }
`;
