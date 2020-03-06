import React from 'react'

export interface CurrencyProps {
  value: number | string
  fraction?: number
  currencyId: string
  className?: string
}

export function Currency({ value, fraction = 2, currencyId, className }: CurrencyProps) {
  return (
    <span style={{ whiteSpace: 'nowrap' }} className={className}>
      {currencyId === 'USD' && '$'}
      {currencyId === 'RUB' && '₽'}
      {' '}
      {Number(value).toLocaleString(undefined, { minimumFractionDigits: fraction })}
    </span>
  )
}
