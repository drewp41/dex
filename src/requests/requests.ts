import { IToken } from './types';

export async function getTokenList(): Promise<IToken[]> {
  const url = 'https://tokens.coingecko.com/uniswap/all.json';

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data.tokens;
}
