'use client';

import { useAccount } from 'wagmi';

import TokenInput from './TokenInput';

import styles from './index.module.scss';

export default function SwapCard() {
  const { isConnected } = useAccount();
  return (
    <div className={`${styles.card} grey-border-box no-hover`}>
      <TokenInput />
      <TokenInput />
      {isConnected ? (
        <>
          <button className={styles.swapBtn}>Approve</button>
          <button className={styles.swapBtn}>Swap</button>
        </>
      ) : (
        <button className={styles.swapBtn}>Connect Wallet</button>
      )}
    </div>
  );
}
