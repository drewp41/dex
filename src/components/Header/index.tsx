import Image from 'next/image';

import SwapIcon from '@/assets/images/swap-icon.svg';

import ChainSelect from './ChainSelect';
import ConnectWallet from './ConnectWallet';

import styles from './index.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image alt='Swap Icon' height={36} src={SwapIcon} width={36} priority />
        <div className={styles.text}>Swap Aggregator</div>
      </div>
      <ChainSelect />
      <ConnectWallet />
    </header>
  );
}
