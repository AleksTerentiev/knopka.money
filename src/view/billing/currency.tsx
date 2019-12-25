import React, { FC } from 'react';
import { CurrencyType } from 'store/balances';

export interface CurrencyProps {
  amount: number | string;
  currencyId: CurrencyType;
  className?: string;
}

export const Currency: FC<CurrencyProps> = props => {
  const { amount, currencyId, className } = props;

  return (
    <span className={className}>
      {currencyId === 'USD' && '$'}
      {Number(amount).toFixed()}
      {currencyId === 'RUB' && '₽'}
    </span>
  );
};
