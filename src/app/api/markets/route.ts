import { NextResponse } from 'next/server';

import { getTokenList } from '@/requests/requests';
import { IToken, IUncleanedMarketToken } from '@/requests/types';

interface IMarketToken {
  logoURI: string;
  name: string;
  symbol: string;
}

async function getCoinGeckoTop100() {
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

  const uncleanedTokenList: IUncleanedMarketToken[] = await res.json();

  const tokenList: IMarketToken[] = uncleanedTokenList.map((token) => ({
    logoURI: token.image,
    name: token.name,
    symbol: token.symbol,
  }));

  return tokenList;
}

export async function GET() {
  const [top100, tokenList] = await Promise.all([
    getCoinGeckoTop100(),
    getTokenList(),
  ]);

  const tokenMap = Object.fromEntries(
    tokenList.map((token) => [token.symbol.toLowerCase(), token])
  );

  // Filter out all non ERC20 tokens from the CoinGecko Top 100
  const topERC20: IToken[] = top100.flatMap((marketToken) => {
    if (!tokenMap.hasOwnProperty(marketToken.symbol)) {
      return [];
    }
    const listToken = tokenMap[marketToken.symbol];
    return [
      {
        ...marketToken,
        address: listToken.address,
        chainId: listToken.chainId,
        decimals: listToken.decimals,
      },
    ];
  });

  return NextResponse.json(topERC20);
}
