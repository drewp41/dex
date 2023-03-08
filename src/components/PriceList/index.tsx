import PriceCard from './PriceCard';

import styles from './index.module.scss';

export default function PriceList() {
  return (
    <div className={styles.list}>
      <PriceCard />
      <PriceCard />
      <PriceCard />
    </div>
  );
}
