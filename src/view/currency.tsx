import React from 'react';

export interface CurrencyProps {
  amount: number | string;
  currencyId: string;
  className?: string;
}

export function Currency({ amount, currencyId, className }: CurrencyProps) {
  return (
    <span className={className}>
      {currencyId === 'USD' && '$'}
      {Number(amount).toFixed()}
      {currencyId === 'RUB' && '₽'}
    </span>
  );
}
