export interface MarketToken {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: Date;
  atl: number;
  atl_change_percentage: number;
  atl_date: Date;
  roi: object;
  last_updated: Date;
}

export interface ListToken {
  address: `0x${string}`;
  chainId: number;
  decimals: number;
  logoURI: string;
  name: string;
  symbol: string;
}

export interface TokenMap {
  [key: `0x${string}`]: ListToken;
}

export interface BalanceToken extends ListToken {
  balance: number;
}

// export interface BalanceToken {
//   contractAddress: `0x${string}`;
//   decimalBalance: number;
//   decimals: number;
//   hexBalance: number;
//   logo: string;
//   name;
//   symbol;
// }
