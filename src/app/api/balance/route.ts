import {
  Alchemy,
  Network,
  TokenBalance,
  TokenBalancesResponse,
  TokenMetadataResponse,
} from 'alchemy-sdk';
import { utils } from 'ethers';
import { NextResponse } from 'next/server';

import { isZeroInHex } from '@/utils/func';

const ALCHEMY_URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_MAINNET_KEY}`;

const settings = {
  apiKey: process.env.ALCHEMY_MAINNET_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const TOKEN_METADATA_REQ_BODY = {
  id: 1,
  jsonrpc: '2.0',
  method: 'alchemy_getTokenMetadata',
};

const TOKEN_METADATA_REQ_OPTIONS = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

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

    const requestLst = nonZeroBalances.map((token: TokenBalance) => ({
      ...TOKEN_METADATA_REQ_BODY,
      params: [token.contractAddress],
    }));

    const fetchPromises = requestLst.map((req) =>
      fetch(ALCHEMY_URL, {
        ...TOKEN_METADATA_REQ_OPTIONS,
        body: JSON.stringify(req),
      })
    );
    const responses = await Promise.all(fetchPromises);

    const jsonResps = await Promise.all(
      responses.map(async (response) => {
        const jsonResp = await response.json();
        return jsonResp.result;
      })
    );

    const res = jsonResps.map((metadata: TokenMetadataResponse, i) => {
      const { tokenBalance, contractAddress } = nonZeroBalances[i];
      const balance = utils.formatUnits(
        tokenBalance || '0',
        metadata.decimals || 18
      );
      return {
        ...metadata,
        contractAddress,
        decimalBalance: balance,
        hexBalance: tokenBalance,
      };
    });
    return NextResponse.json(res);
  } catch (error) {
    throw error;
  }
}
