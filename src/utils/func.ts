import { DEFAULT_CHAIN } from './const';

export function fetchChainFromLocalStorage() {
  try {
    const item = window.localStorage.getItem('currChain');
    return item ? JSON.parse(item) : DEFAULT_CHAIN;
  } catch (error) {
    console.error(error);
    return DEFAULT_CHAIN;
  }
}
