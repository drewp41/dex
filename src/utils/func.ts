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

export function compressAddress(address: `0x${string}`) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatPrice(num: number) {
  let formattedNum;

  if (num >= 1e12) {
    return 'woahhh';
  } else if (num >= 1e12) {
    formattedNum = (num / 1e9).toFixed(2) + 'T';
  } else if (num >= 1e9) {
    formattedNum = (num / 1e9).toFixed(2) + 'B';
  } else if (num >= 1e6) {
    formattedNum = (num / 1e6).toFixed(2) + 'M';
  } else {
    formattedNum = num.toFixed(2);
  }

  const parts = formattedNum.split('.');
  parts[0] = parseInt(parts[0], 10).toLocaleString();
  formattedNum = parts.join('.');

  return '$' + formattedNum;
}
