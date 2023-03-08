import Image from 'next/image';

import SwapIcon from '@/assets/images/swap-icon.svg';
import ConnectWallet from '@/components/ConnectWallet';

import ChainSelect from './ChainSelect';

import styles from './index.module.scss';

export default function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo}>
        <Image alt='Swap Icon' height={36} src={SwapIcon} width={36} priority />
        <div className={styles.text}>Swap Aggregator</div>
      </div>
      <ConnectWallet />
      <ChainSelect />
    </nav>
  );
}
