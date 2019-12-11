import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { BalancesData, GET_BALANCES } from 'store/balances';

export interface BalanceProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Balance: React.FC<BalanceProps> = ({ ...other }) => {
  const { data } = useQuery<BalancesData>(GET_BALANCES);

  return <span {...other}>{data && Number(data.balances[0].amount).toFixed() + '₽'}</span>;
};
