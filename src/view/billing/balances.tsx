import React, { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import _ from 'lodash';
import { Currency } from 'view/billing/currency';
import { GET_BALANCES } from '../queries';
import { GetBalances } from '../gql-types/GetBalances';

export interface BalancesProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Balances: React.FC<BalancesProps> = ({ ...other }) => {
  const { data } = useQuery<GetBalances>(GET_BALANCES);
  const currencyId = 'RUB';

  const balance = useMemo(() => {
    return data && _.find(data.balances, { currencyId });
  }, [data]);

  return <span {...other}>{balance && <Currency amount={balance.amount} currencyId={currencyId} />}</span>;
};
