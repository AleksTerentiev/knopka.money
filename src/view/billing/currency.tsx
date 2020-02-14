import React from 'react'

export interface CurrencyProps {
  amount: number | string
  currencyId: string
  className?: string
}

export function Currency({ amount, currencyId, className }: CurrencyProps) {
  return (
    <span style={{ whiteSpace: 'nowrap' }} className={className}>
      {currencyId === 'USD' && '$'}
      {currencyId === 'RUB' && '₽'} {Number(amount).toLocaleString()}
    </span>
  )
}
