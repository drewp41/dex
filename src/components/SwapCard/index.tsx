import SwapBtn from './SwapBtn';
import TokenInput from './TokenInput';

import styles from './index.module.scss';

export default function SwapCard() {
  return (
    <>
      <div className={`${styles.card} grey-border-box no-hover`}>
        <TokenInput defaultToken={'ETH'} />
        <TokenInput defaultToken={null} />
        <SwapBtn />
      </div>
    </>
  );
}
