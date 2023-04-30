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

export function isZeroInHex(hexString: string) {
  return parseInt(hexString, 16) === 0;
}

export function formatNum(num: number, digits = 2) {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: num >= 1000 ? 0 : digits,
    maximumFractionDigits: num >= 1000 ? 0 : digits,
  });
}
