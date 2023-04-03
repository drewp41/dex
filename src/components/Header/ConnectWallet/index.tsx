'use client';

import { ConnectKitButton } from 'connectkit';

import styles from './index.module.scss';

export default function ConnectWallet() {
  return (
    <div className={styles.box}>
      <ConnectKitButton.Custom>
        {({ isConnected, show, ensName, truncatedAddress }) => {
          return (
            <button className={`${styles.btn} grey-border-box`} onClick={show}>
              {isConnected
                ? ensName
                  ? ensName
                  : truncatedAddress
                : 'Connect Wallet'}
            </button>
          );
        }}
      </ConnectKitButton.Custom>
    </div>
  );
}
