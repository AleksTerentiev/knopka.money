import { find, orderBy } from 'lodash'
import { useMemo } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GetCurrencies } from './types/GetCurrencies'
import { GetTariffs } from './types/GetTariffs'
import { GetAccount } from './types/GetAccount'
import { GetBalances } from './types/GetBalances'
import { GetInvestments } from './types/GetInvestments'
import { GetInvestment } from './types/GetInvestment'
import { GetInvoices } from './types/GetInvoices'
import { GetAffiliateTotals } from './types/GetAffiliateTotals'
import { GetAffiliateReferrals } from './types/GetAffiliateReferrals'
import { GetAffiliateAccruals } from './types/GetAffiliateAccruals'
import { GetPayouts } from './types/GetPayouts'
import { GetPayoutMethods } from './types/GetPayoutMethods'
import {
  GET_CURRENCIES,
  GET_TARIFFS,
  GET_ACCOUNT,
  GET_BALANCES,
  GET_INVESTMENTS,
  GET_INVESTMENT,
  GET_INVOICES,
  GET_AFFILIATE_TOTALS,
  GET_AFFILIATE_REFERRALS,
  GET_AFFILIATE_ACCRUALS,
  GET_PAYOUT_METHODS,
  GET_PAYOUTS,
  CREATE_INVESTMENT,
  CLOSE_INVESTMENT,
  AFFILIATE_BIND,
  CREATE_PAYOUT,
} from './queries'

/**
 *
 * QUERIES
 *
 **/

export const useCurrencies = () => {
  const q = useQuery<GetCurrencies>(GET_CURRENCIES)
  return { currencies: q.data?.currencies || [], ...q }
}

export const useTariffs = () => {
  const q = useQuery<GetTariffs>(GET_TARIFFS)
  return { tariffs: q.data?.tariffs || [], ...q }
}

export const useAccount = () => {
  const q = useQuery<GetAccount>(GET_ACCOUNT)
  return { account: q.data?.account, ...q }
}

export const useBalance = (currencyId = 'RUB') => {
  const q = useQuery<GetBalances>(GET_BALANCES)
  const balance = useMemo(() => find(q.data?.balances, { currencyId }), [
    q.data,
    currencyId,
  ])
  return { balance: balance ? Number(balance.amount) : null, ...q }
}

export const useInvestments = () => {
  const q = useQuery<GetInvestments>(GET_INVESTMENTS)
  const investments = useMemo(() => {
    return orderBy(q.data?.investments, ['createdAt'], ['desc']) || []
  }, [q.data])
  return { investments, ...q }
}

export const useInvestment = (id: string) => {
  const q = useQuery<GetInvestment>(GET_INVESTMENT, {
    variables: { id },
  })
  return { investment: q.data?.investment, ...q }
}

export const useInvoices = () => {
  const q = useQuery<GetInvoices>(GET_INVOICES)
  const invoices = useMemo(() => {
    return orderBy(q.data?.invoices, ['createdAt'], ['desc']) || []
  }, [q.data])
  return { invoices, ...q }
}

export const useAffiliateTotals = () => {
  const q = useQuery<GetAffiliateTotals>(GET_AFFILIATE_TOTALS)
  return { affiliateTotals: q.data?.affiliateTotals || [], ...q }
}

export const useAffiliateReferrals = () => {
  const q = useQuery<GetAffiliateReferrals>(GET_AFFILIATE_REFERRALS)
  return { affiliateReferrals: q.data?.affiliateReferrals || [], ...q }
}
export const useAffiliateAccruals = () => {
  const q = useQuery<GetAffiliateAccruals>(GET_AFFILIATE_ACCRUALS)
  return { affiliateAccruals: q.data?.affiliateAccruals || [], ...q }
}

export const usePayoutMethods = () => {
  const q = useQuery<GetPayoutMethods>(GET_PAYOUT_METHODS)
  return { payoutMethods: q.data?.payoutMethods || [], ...q }
}

export const usePayouts = () => {
  const q = useQuery<GetPayouts>(GET_PAYOUTS)
  const payouts = useMemo(() => {
    return orderBy(q.data?.payouts, ['createdAt'], ['desc']) || []
  }, [q.data])
  return { payouts, ...q }
}

/**
 *
 * MUTATIONS
 *
 **/

export const useCreateInvestment = () => {
  const { refetch: refetchBalance } = useBalance()
  return useMutation(CREATE_INVESTMENT, {
    update(cache, { data: { createInvestment } }) {
      const cachedData: any = cache.readQuery({ query: GET_INVESTMENTS })
      cache.writeQuery({
        query: GET_INVESTMENTS,
        data: { investments: [...cachedData.investments, createInvestment] },
      })
    },
    onCompleted() {
      refetchBalance()
    },
  })
}

export const useCloseInvestment = () => {
  const { refetch: refetchBalance } = useBalance()
  return useMutation(CLOSE_INVESTMENT, {
    onCompleted() {
      refetchBalance()
    },
  })
}

export const useAffiliateBind = () => {
  return useMutation(AFFILIATE_BIND)
}

export const useCreatePayout = () => {
  const { refetch: refetchBalance } = useBalance()
  return useMutation(CREATE_PAYOUT, {
    update(cache, { data: { createPayout } }) {
      const cachedData: any = cache.readQuery({ query: GET_PAYOUTS })
      cache.writeQuery({
        query: GET_PAYOUTS,
        data: { payouts: [...cachedData.payouts, createPayout] },
      })
    },
    onCompleted() {
      refetchBalance()
    },
  })
}
