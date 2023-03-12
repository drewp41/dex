import { arbitrum, mainnet, optimism, polygon } from '@wagmi/chains';

export const ONE_INCH_BASE_URL = 'fd';

export type Chain = 'homestead' | 'matic' | 'arbitrum' | 'optimism';

export const CHAIN_ID_MAP = {
  homestead: 1,
  matic: 137,
  arbitrum: 42161,
  optimism: 10,
};

export const CHAIN_LIST = [mainnet, arbitrum, optimism, polygon];
