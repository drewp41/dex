import useSWR from 'swr';

import { APIs } from '../apiPaths';
import { BalanceToken } from '../types';

const fetchBalance = async (url: string) => {
  console.log('FETCHIN BAL');
  const data = await fetch(url);
  const balance: BalanceToken[] = await data.json();
  console.log(balance);
  return balance;
};

export function useAllBalances(address: `0x${string}` | undefined) {
  let {
    data: balance,
    isLoading,
    error,
  } = useSWR(() => APIs.balance + '/?address=' + address, fetchBalance);

  return {
    balance,
    isLoading,
    error,
  };
}
