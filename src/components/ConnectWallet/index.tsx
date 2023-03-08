'use client';

import { ConnectKitButton } from 'connectkit';

import styles from './index.module.scss';

export default function ConnectWallet() {
  return (
    <div className={styles.box}>
      <ConnectKitButton.Custom>
        {({ isConnected, isConnecting, show, hide, address, ensName }) => {
          return (
            <button className={styles.button} onClick={show}>
              {isConnected ? address : 'Connect Wallet'}
            </button>
          );
        }}
      </ConnectKitButton.Custom>
    </div>
  );
}
