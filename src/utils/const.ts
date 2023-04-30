import { arbitrum, mainnet, optimism, polygon } from 'wagmi/chains';

import { IBalanceToken } from '@/requests/types';

export const ONE_INCH_BASE_URL = 'fd';

export type Network = 'homestead' | 'matic' | 'arbitrum' | 'optimism';

export const CHAIN_LIST = [mainnet, polygon, optimism, arbitrum];

export const DEFAULT_CHAIN = '1';

export const ETHER_TOKEN: IBalanceToken = {
  symbol: 'ETH',
  name: 'Ether',
  logoURI:
    'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
  chainId: 1,
  address: '0x0',
  decimals: 18,
  balance: 0,
  price: {
    usd: 1850.43, // not actually used
    eth: 1,
  },
  chains: {
    ethereum: '0x0',
  },
};
