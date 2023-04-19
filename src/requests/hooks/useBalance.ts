import useSWR from 'swr';

import { APIs } from '../apiPaths';

const fetchBalance = async (url: string) => {
  console.log('FETCHIN BAL');
  const data = await fetch(url);
  const balance = await data.json();
  return balance;
};

export function useBalance(address: `0x${string}` | undefined) {
  let { data, isLoading, error } = useSWR(
    () => APIs.balance + '/?address=' + address,
    fetchBalance
  );

  return {
    balance: data,
    isLoading,
    error,
  };
}
