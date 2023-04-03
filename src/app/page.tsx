import PriceList from '@/components/PriceList';
import SwapCard from '@/components/SwapCard';

import styles from './page.module.scss';

export default async function Home() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.greenGlow} />
        <div className={styles.redGlow} />
        <SwapCard />
        <PriceList />
      </div>
    </>
  );
}
