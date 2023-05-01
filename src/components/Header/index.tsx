import ChainSelect from './ChainSelect';
import ConnectWallet from './ConnectWallet';
import SwapIcon from './SwapIcon';

import styles from './index.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <SwapIcon />
        <div className={styles.text}>Swap Aggregator</div>
      </div>
      <div className={styles.right}>
        <ChainSelect />
        <ConnectWallet />
      </div>
    </header>
  );
}
