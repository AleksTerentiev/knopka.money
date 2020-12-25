import React from 'react'
import { Currency } from 'components/billing/currency'
import { useBalance } from 'gql'

export interface BalancesProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Balances: React.FC<BalancesProps> = ({ ...other }) => {
  const currencyId = 'RUB'
  const { balance } = useBalance(currencyId)

  if (balance === null) {
    return null
  }

  return <span {...other}>{<Currency value={balance} currencyId={currencyId} />}</span>
}
