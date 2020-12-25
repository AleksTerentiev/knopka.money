import React from 'react';

export interface CurrencyProps {
  value: number | string;
  fraction?: number;
  currencyId: string;
  className?: string;
  rubRight?: boolean;
}

export function Currency({
  value,
  fraction = 2,
  rubRight,
  currencyId,
  className,
}: CurrencyProps) {
  return (
    <span style={{ whiteSpace: 'nowrap' }} className={className}>
      {currencyId === 'USD' && '$ '}
      {!rubRight && currencyId === 'RUB' && '₽ '}
      {Number(value).toLocaleString(undefined, { minimumFractionDigits: fraction })}
      {rubRight && currencyId === 'RUB' && '₽'}
    </span>
  );
}
