import { arbitrum, mainnet, optimism, polygon } from 'wagmi/chains';

import backupTokenList from './backup_token_list.json';

export const ONE_INCH_BASE_URL = 'fd';

export type Network = 'homestead' | 'matic' | 'arbitrum' | 'optimism';

export const CHAIN_LIST = [mainnet, polygon, optimism, arbitrum];

export const DEFAULT_CHAIN = '1';

export const BACKUP_TOKEN_LIST = backupTokenList;
