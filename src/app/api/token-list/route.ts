import { NextResponse } from 'next/server';

export async function GET() {
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

  return NextResponse.json(data.tokens);
}
