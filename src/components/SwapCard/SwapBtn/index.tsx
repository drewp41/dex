'use client';

import { useAccount } from 'wagmi';

import styles from '../index.module.scss';

export default function SwapBtn() {
  const { isConnected } = useAccount();

  return (
    <>
      {isConnected ? (
        <>
          <button className={styles.swapBtn}>Approve</button>
          <button className={styles.swapBtn}>Swap</button>
        </>
      ) : (
        <button className={styles.swapBtn}>Connect Wallet</button>
      )}
    </>
  );
}
