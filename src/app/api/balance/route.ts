import { Alchemy, Network, TokenBalance } from 'alchemy-sdk';
import { ethers } from 'ethers';
import { NextResponse } from 'next/server';

import { getTokenList } from '@/requests/requests';
import { type IBalanceToken, IToken } from '@/requests/types';
import { ETHER_TOKEN } from '@/utils/const';
import { isZeroInHex } from '@/utils/func';

interface TokenAddressMap {
  [key: `0x${string}`]: IToken;
}

const settings = {
  apiKey: process.env.ALCHEMY_MAINNET_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

async function getEtherPrice(): Promise<number> {
  const params = new URLSearchParams({
    ids: 'ethereum',
    vs_currencies: 'usd',
  });
  const url = `https://pro-api.coingecko.com/api/v3/simple/price?${params.toString()}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-cg-pro-api-key': process.env.COINGECKO_API_KEY || '',
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data.ethereum.usd;
}

interface ITokenInfo {
  id: string;
  symbol: string;
  name: string;
  platforms: {
    ethereum: string;
    'arbitrum-one'?: string;
    'optimistic-ethereum'?: string;
  };
  market_data: {
    current_price: {
      usd: number;
      eth: number;
    };
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
}

// Gives the high quality token image, the current price (in USD and ETH),
// and all the contract addresses across for other chains (Optimism and Arbitrum)
async function getCoinGeckoTokenInfo(
  address: `0x${string}`
): Promise<ITokenInfo> {
  const url = `https://pro-api.coingecko.com/api/v3/coins/ethereum/contract/${address}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-cg-pro-api-key': process.env.COINGECKO_API_KEY || '',
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const priceMap = await res.json();
  return priceMap;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address') || '';
  try {
    const [balances, tokenList, etherPrice] = await Promise.all([
      alchemy.core.getTokenBalances(address),
      getTokenList(),
      getEtherPrice(),
    ]);

    const nonZeroBalances: TokenBalance[] = balances.tokenBalances
      .filter((token) => {
        return !isZeroInHex(token.tokenBalance || '0');
      })
      .slice(0, 10);

    const tokenMap: TokenAddressMap = Object.fromEntries(
      tokenList.map((token) => [token.address, token])
    );

    let tokenBalances: IBalanceToken[] = nonZeroBalances.flatMap((token) => {
      const { tokenBalance, contractAddress } = token;

      if (!tokenMap.hasOwnProperty(contractAddress)) {
        return [];
      }
      const listToken = tokenMap[contractAddress as `0x${string}`];
      const balance = parseFloat(
        ethers.utils.formatUnits(tokenBalance || '0', listToken.decimals)
      );
      return [{ ...listToken, balance }];
    }) as IBalanceToken[];

    const tokenInfoPromises = tokenBalances.map((token) =>
      getCoinGeckoTokenInfo(token.address)
    );

    const tokenInfo = await Promise.all(tokenInfoPromises);

    tokenBalances = tokenBalances.map((token, index) => {
      const info = tokenInfo[index];
      return {
        ...token,
        logoURI: info.image.large,
        price: {
          usd: info.market_data.current_price.usd,
          eth: info.market_data.current_price.eth,
        },
        chains: {
          ethereum: info.platforms.ethereum,
          arbitrum: info.platforms['arbitrum-one'],
          optimism: info.platforms['optimistic-ethereum'],
        },
      };
    });
    tokenBalances.unshift({
      ...ETHER_TOKEN,
      price: { usd: etherPrice, eth: 1 },
    });
    return NextResponse.json(tokenBalances);
  } catch (error) {
    throw error;
  }
}
