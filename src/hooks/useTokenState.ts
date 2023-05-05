import { useState } from 'react';
import useSWR from 'swr';

import { ITokenState } from '@/requests/types';
import { ETHER_TOKEN } from '@/utils/const';

interface IAllTokenState {
  first: ITokenState;
  second: ITokenState;
}

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

  const setFirstTokenState = (newTokenState: ITokenState) => {
    console.log('hi');
    setTokenState({
      first: newTokenState,
      second: tokenState!.second,
    });
    // Make the number even
    setFirstTokenChanged((prev) => (prev % 2 === 0 ? prev + 2 : prev + 1));
  };

  const setSecondTokenState = (newTokenState: ITokenState) => {
    console.log('bye');
    setTokenState({
      first: tokenState!.first,
      second: newTokenState,
    });
    // Make the number odd
    setFirstTokenChanged((prev) => (prev % 2 === 0 ? prev + 1 : prev + 2));
  };

  console.log(firstTokenChanged);

  const switchTokens = () => {
    setTokenState({
      first: tokenState!.second,
      second: tokenState!.first,
    });
  };

  return {
    tokenState,
    setTokenState,
    setFirstTokenState,
    setSecondTokenState,
    switchTokens,
    firstTokenChanged,
  };
};

export default useTokenState;
