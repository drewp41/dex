import { useEffect, useState } from 'react';
import { CurrencyAmount, Percent, Token, TradeType } from '@uniswap/sdk-core';
import {
  AlphaRouter,
  SwapOptionsSwapRouter02,
  SwapRoute,
  SwapType,
} from '@uniswap/smart-order-router';
import { mainnet } from '@wagmi/chains';
import { ethers } from 'ethers';
import JSBI from 'jsbi';
import { useAccount, useProvider } from 'wagmi';

import useTokenState from './useTokenState';

export default function useSwap() {
  const { tokenState, areBothTokensSet } = useTokenState();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const provider = useProvider();

  const [tokenA, setTokenA] = useState<Token | null>(null);
  const [tokenB, setTokenB] = useState<Token | null>(null);

  const { address } = useAccount();

  useEffect(() => {
    if (areBothTokensSet() && tokenState) {
      const newTokenA = new Token(
        mainnet.id,
        tokenState.first.token?.address as string,
        tokenState.first.token?.decimals || 18,
        tokenState.first.token?.symbol,
        tokenState.first.token?.name
      );
      const newTokenB = new Token(
        mainnet.id,
        tokenState.second.token?.address as string,
        tokenState.second.token?.decimals || 18,
        tokenState.second.token?.symbol,
        tokenState.second.token?.name
      );
      setTokenA(newTokenA);
      setTokenB(newTokenB);
    }
  }, [tokenState]);

  async function getQuote(): Promise<SwapRoute | null> {
    if (!areBothTokensSet()) {
      return null;
    }

    const mainnetProvider = new ethers.providers.JsonRpcProvider(
      'https://eth-mainnet.g.alchemy.com/v2/FPErQT2KwQ1fRzM3fb4jWRGOyk3HpdZr'
    );
    const router = new AlphaRouter({
      chainId: mainnet.id,
      provider: mainnetProvider,
    });

    const options: SwapOptionsSwapRouter02 = {
      recipient: address as string,
      slippageTolerance: new Percent(50, 10_000),
      deadline: Math.floor(Date.now() / 1000 + 1800),
      type: SwapType.SWAP_ROUTER_02,
    };

    const amountInn = ethers.utils.parseUnits(
      tokenState?.first.amount || '1',
      tokenA?.decimals
    );
    const currencyAmt = CurrencyAmount.fromRawAmount(
      tokenA!,
      JSBI.BigInt(amountInn)
    );

    console.log('FETCHING ROUTE');
    const route = await router.route(
      currencyAmt,
      tokenB!,
      TradeType.EXACT_INPUT,
      options
    );

    return route;
  }

  return { getQuote };
}
