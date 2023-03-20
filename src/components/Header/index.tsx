import Image from 'next/image';

import ChainSelect from './ChainSelect';
import ConnectWallet from './ConnectWallet';

import styles from './index.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image
          alt='Swap Icon'
          height={36}
          src='/images/swap-icon.svg'
          width={36}
          priority
        />
        <div className={styles.text}>Swap Aggregator</div>
      </div>
      <div className={styles.right}>
        <ChainSelect />
        <ConnectWallet />
      </div>
    </header>
  );
}
