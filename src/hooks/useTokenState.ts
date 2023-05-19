import { useState } from 'react';
import useSWR from 'swr';

import { IAllTokenState, ITokenState } from '@/requests/types';
import { ETHER_TOKEN } from '@/utils/const';

const useTokenState = () => {
  const { data: tokenState, mutate: setTokenState } = useSWR<IAllTokenState>(
    'tokenState',
    {
      fallbackData: {
        first: {
          token: ETHER_TOKEN,
          amount: '0',
        },
        second: {
          token: null,
          amount: '0',
        },
      },
    }
  );
  // Used by the SwapCard component to see which token was changed
  // if it's an even number than first was changed, odd means second
  const [firstTokenChanged, setFirstTokenChanged] = useState(0);

  const switchTokens = () => {
    setTokenState({
      first: tokenState!.second,
      second: tokenState!.first,
    });
  };

  const setFirstTokenState = (newTokenState: ITokenState) => {
    if (newTokenState.token?.address === tokenState!.second.token?.address) {
      switchTokens();
      return;
    }
    setTokenState({
      first: newTokenState,
      second: tokenState!.second,
    });
    // Make the number even
    setFirstTokenChanged((prev) => (prev % 2 === 0 ? prev + 2 : prev + 1));
  };

  const setSecondTokenState = (newTokenState: ITokenState) => {
    if (newTokenState.token?.address === tokenState!.first.token?.address) {
      switchTokens();
      return;
    }
    setTokenState({
      first: tokenState!.first,
      second: newTokenState,
    });
    // Make the number odd
    setFirstTokenChanged((prev) => (prev % 2 === 0 ? prev + 1 : prev + 2));
  };

  const isCurrSelectedToken = (address: `0x${string}`, isFirst: boolean) =>
    tokenState?.[isFirst ? 'first' : 'second'].token?.address === address;

  const isOtherSelectedToken = (address: `0x${string}`, isFirst: boolean) =>
    tokenState?.[isFirst ? 'second' : 'first'].token?.address === address;

  const areBothTokensSet = () =>
    tokenState?.first.token !== null && tokenState?.second.token !== null;

  return {
    tokenState,
    setTokenState,
    setFirstTokenState,
    setSecondTokenState,
    switchTokens,
    firstTokenChanged,
    isCurrSelectedToken,
    isOtherSelectedToken,
    areBothTokensSet,
  };
};

export default useTokenState;
