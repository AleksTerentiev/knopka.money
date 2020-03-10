import { useEffect, useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GetBalances } from 'gql-types/GetBalances'
import { GET_BALANCES } from 'queries'
import _ from 'lodash'

export const useBalance = () => {
  const { data: balancesData, refetch: refetchBalances } = useQuery<GetBalances>(
    GET_BALANCES
  )
  const balance = useMemo(() => _.find(balancesData?.balances, { currencyId: 'RUB' }), [
    balancesData,
  ])

  return Number(balance?.amount)
}
