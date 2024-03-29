import useSWR from 'swr';

import { ETHER_TOKEN } from '@/utils/const';

import { APIs } from '../apiPaths';
import { IBalanceToken } from '../types';

const fetchPortfolio = async (url: string) => {
  console.log('FETCHIN BAL');
  const data = await fetch(url);
  const balance: IBalanceToken[] = await data.json();
  return balance;
};

export function usePortfolio(address: `0x${string}` | undefined) {
  let {
    data: balance,
    isLoading,
    error,
  } = useSWR(() => APIs.balance + '/?address=' + address, fetchPortfolio);

  if (balance === undefined) {
    balance = [ETHER_TOKEN];
  }

  const portfolioSet = new Set(balance.map((token) => token.address));

  return {
    balance,
    portfolioSet,
    isLoading,
    error,
  };
}
