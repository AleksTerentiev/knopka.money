import React, { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CurrencyType, BalancesData, GET_BALANCES } from 'store/balances';
import _ from 'lodash';
import { Currency } from 'view/billing/currency';

export interface BalancesProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Balances: React.FC<BalancesProps> = ({ ...other }) => {
  const { data } = useQuery<BalancesData>(GET_BALANCES);
  const currencyId: CurrencyType = 'RUB';

  const balance = useMemo(() => {
    return data && _.find(data.balances, { currencyId });
  }, [data]);

  return <span {...other}>{balance && <Currency amount={balance.amount} currencyId={currencyId} />}</span>;
};
