import { arbitrum, mainnet, optimism, polygon } from 'wagmi/chains';

export const ONE_INCH_BASE_URL = 'fd';

export type Network = 'homestead' | 'matic' | 'arbitrum' | 'optimism';

export const CHAIN_LIST = [mainnet, polygon, optimism, arbitrum];

export const DEFAULT_CHAIN = '1';

export const ETHER_TOKEN = {
  id: 'ethereum',
  symbol: 'eth',
  name: 'Ethereum',
  image:
    'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
  current_price: 1779.11,
  market_cap: 214374488141,
  market_cap_rank: 2,
  fully_diluted_valuation: 214374488141,
  total_volume: 7163464787,
  high_24h: 1826.78,
  low_24h: 1764.94,
  price_change_24h: -40.25237138251873,
  price_change_percentage_24h: -2.21245,
  market_cap_change_24h: -4833296012.6285095,
  market_cap_change_percentage_24h: -2.20489,
  circulating_supply: 120445564.005163,
  total_supply: 120445564.005163,
  max_supply: null,
  ath: 4878.26,
  ath_change_percentage: -63.5111,
  ath_date: '2021-11-10T14:24:19.604Z',
  atl: 0.432979,
  atl_change_percentage: 411010.9355,
  atl_date: '2015-10-20T00:00:00.000Z',
  roi: {
    times: 84.76832059229982,
    currency: 'btc',
    percentage: 8476.83205922998,
  },
  last_updated: '2023-04-03T05:26:49.204Z',
};
