import { useEffect, useState } from 'react';
import { erc20ABI, multicall } from '@wagmi/core';

interface IUseMultiToken {
  addresses: `0x${string}`[];
}

export default function useMultiToken({ addresses }: IUseMultiToken) {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const d = await multicall({
        contracts: addresses.map((address) => ({
          address,
          abi: erc20ABI,
          functionName: 'decimals',
        })),
      });
      setData(d);
    };
    fetchData();
  }, []);
  return { data };
}
