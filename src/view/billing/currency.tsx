import React from 'react'

export interface CurrencyProps {
  value: number | string
  currencyId: string
  className?: string
}

export function Currency({ value, currencyId, className }: CurrencyProps) {
  return (
    <span style={{ whiteSpace: 'nowrap' }} className={className}>
      {currencyId === 'USD' && '$'}
      {currencyId === 'RUB' && '₽'}
      {' '}
      {Number(value).toLocaleString(undefined, { minimumFractionDigits: 2 })}
    </span>
  )
}
