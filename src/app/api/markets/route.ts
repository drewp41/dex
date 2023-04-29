import { NextResponse } from 'next/server';

import { MarketToken, UncleanedMarketToken } from '@/requests/types';

export async function GET() {
  const params = new URLSearchParams({
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: '100',
    page: '1',
    sparkline: 'false',
    locale: 'en',
  });
  const url = `https://pro-api.coingecko.com/api/v3/coins/markets?${params.toString()}`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-cg-pro-api-key': process.env.COINGECKO_API_KEY || '',
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const uncleanedTokenList: UncleanedMarketToken[] = await res.json();

  const tokenList: MarketToken[] = uncleanedTokenList.map((token) => ({
    logoURI: token.image,
    name: token.name,
    symbol: token.symbol,
  }));

  return NextResponse.json(tokenList);
}
