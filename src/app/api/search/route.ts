import { NextResponse } from 'next/server';

import { IToken, ITokenInfo } from '@/requests/types';
import { ChainEnum } from '@/utils/const';

interface ISearchToken {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}

interface ISearchResults {
  coins: ISearchToken[];
}

async function fetchInfoFromAddress(
  chain: ChainEnum,
  query: `0x${string}`
): Promise<ITokenInfo | null> {
  const url = `https://pro-api.coingecko.com/api/v3/coins/${chain}/contract/${query}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-cg-pro-api-key': process.env.COINGECKO_API_KEY || '',
    },
  });
  if (!res.ok) {
    // Not an error because if the contract doesn't exist on the chain, it will return a 404
    return null;
  }
  const data = await res.json();
  return data;
}

async function searchContract(query: `0x${string}`) {
  const [ethereum, arbitrum, optimism] = await Promise.all([
    fetchInfoFromAddress(ChainEnum.ethereum, query),
    fetchInfoFromAddress(ChainEnum['arbitrum-one'], query),
    fetchInfoFromAddress(ChainEnum['optimistic-ethereum'], query),
  ]);
  // At most, only one of these calls will work (unless by chance the contract address is the same across chains)
  const nonNullToken = [ethereum, arbitrum, optimism].find(
    (value) => value !== null
  );
  if (nonNullToken !== undefined && nonNullToken !== null) {
    // Convert the data from ITokenInfo to IToken
    const res: IToken = {
      address: query,
      chainId: 1,
      decimals: 18,
      logoURI: nonNullToken.image.large,
      name: nonNullToken.name,
      symbol: nonNullToken.symbol,
      price: {
        usd: nonNullToken.market_data.current_price.usd,
        eth: nonNullToken.market_data.current_price.eth,
      },
    };
    return NextResponse.json([res]);
  } else {
    return NextResponse.json([]);
  }
}

async function searchQuery(query: string) {
  const params = new URLSearchParams({ query });
  const url = `https://pro-api.coingecko.com/api/v3/search?${params.toString()}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-cg-pro-api-key': process.env.COINGECKO_API_KEY || '',
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const searchResults: ISearchResults = await res.json();
  const cleanedResults: IToken[] = searchResults.coins.map((token) => ({
    address: '0x1',
    chainId: 1,
    decimals: 18,
    logoURI: token.large,
    name: token.name,
    symbol: token.symbol,
  }));
  return NextResponse.json(cleanedResults);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  // Search by the address
  if (query.startsWith('0x')) {
    return searchContract(query as `0x${string}`);
  } else {
    return searchQuery(query);
  }
}
