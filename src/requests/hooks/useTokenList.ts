import useSWRImmutable from 'swr';

import { APIs } from '../apiPaths';
import { getTokenList } from '../requests';

export function useTokenList() {
  let {
    data: tokenList,
    isLoading,
    error,
  } = useSWRImmutable(() => APIs.tokenList, getTokenList);

  const tokenNameMap = Object.fromEntries(
    (tokenList || []).map((token) => [token.name.toLowerCase(), token])
  );

  return {
    tokenList,
    tokenNameMap,
    isLoading,
    error,
  };
}
