export interface IUncleanedMarketToken {
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

export interface IToken {
  address: `0x${string}`;
  chainId: number;
  decimals: number;
  logoURI: string;
  name: string;
  symbol: string;
  price?: {
    usd: number;
    eth: number;
  };
}

export interface IBalanceToken extends IToken {
  balance: number;
  price: {
    usd: number;
    eth: number;
  };
  chains: {
    ethereum: string;
    arbitrum?: string;
    optimism?: string;
  };
}

export interface ITokenInfo {
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
