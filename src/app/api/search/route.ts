import { NextResponse } from 'next/server';

import { IToken } from '@/requests/types';

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const params = new URLSearchParams({
    query,
  });
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
