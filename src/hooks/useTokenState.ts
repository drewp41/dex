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

  const setFirstTokenState = (newTokenState: ITokenState) => {
    setTokenState({
      first: newTokenState,
      second: tokenState!.second,
    });
  };

  const setSecondTokenState = (newTokenState: ITokenState) => {
    setTokenState({
      first: tokenState!.first,
      second: newTokenState,
    });
  };

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
  };
};

export default useTokenState;
