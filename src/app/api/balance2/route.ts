import {
  Alchemy,
  Network,
  TokenBalance,
  TokenBalancesResponse,
} from 'alchemy-sdk';
import { ethers } from 'ethers';
import { NextResponse } from 'next/server';

import {
  type BalanceToken,
  type ListToken,
  type TokenMap,
} from '@/requests/types';
import { isZeroInHex } from '@/utils/func';

const settings = {
  apiKey: process.env.ALCHEMY_MAINNET_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address') || '';
  try {
    const balances: TokenBalancesResponse = await alchemy.core.getTokenBalances(
      address
    );

    const nonZeroBalances: TokenBalance[] = balances.tokenBalances
      .filter((token) => {
        return !isZeroInHex(token.tokenBalance || '0');
      })
      .slice(0, 10);

    const tokenList: ListToken[] = await (
      await fetch('http://localhost:3000/api/token-list')
    ).json();

    const tokenMap: TokenMap = Object.fromEntries(
      tokenList.map((token) => [token.address, token])
    );

    const tokenBalances: BalanceToken[] = nonZeroBalances.flatMap((token) => {
      const { tokenBalance, contractAddress } = token;

      if (!tokenMap.hasOwnProperty(contractAddress)) {
        return [];
      }
      const listToken = tokenMap[contractAddress as `0x${string}`];
      const balance = parseFloat(
        ethers.utils.formatUnits(tokenBalance || '0', listToken.decimals)
      );
      return [{ ...listToken, balance }];
    });
    return NextResponse.json(tokenBalances);
  } catch (error) {
    throw error;
  }
}
