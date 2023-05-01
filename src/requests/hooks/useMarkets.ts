import useSWRImmutable from 'swr';

import { APIs } from '../apiPaths';
import { IToken } from '../types';

const fetchMarkets = async (url: string) => {
  console.log('FETCHING MARKETS');
  const data = await fetch(url);
  const markets: IToken[] = await data.json();
  const originalMarkets = [...markets];
  return { markets, originalMarkets };
};

export function useMarkets() {
  let { data, isLoading, error } = useSWRImmutable(APIs.markets, fetchMarkets);

  if (!data || error) {
    data = {
      markets: [],
      originalMarkets: [],
    };
  }

  const onMarketsSearch = (query: string) => {
    if (!data?.markets) return;
    query = query.toLowerCase();
    const filteredMarkets = data?.originalMarkets.filter(
      (token) =>
        token.name.toLowerCase().includes(query) ||
        token.symbol.toLowerCase().includes(query)
    );
    data.markets = filteredMarkets;
  };

  const { markets } = data;

  return {
    markets,
    onMarketsSearch,
    isLoading,
    error,
  };
}
