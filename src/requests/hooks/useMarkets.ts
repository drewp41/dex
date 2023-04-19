import useSWRImmutable from 'swr';

import { APIs } from '../apiPaths';

const fetchMarkets = async (url: string) => {
  const data = await fetch(url);
  const markets = await data.json();
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
    query = query.toLowerCase();
    const filteredMarkets = data?.originalMarkets.filter(
      (token: any) =>
        token.name.toLowerCase().includes(query) ||
        token.symbol.toLowerCase().includes(query)
    );
    data!.markets = filteredMarkets;
  };

  const { markets } = data;

  return {
    markets,
    onMarketsSearch,
    isLoading,
    error,
  };
}
