// import { providers } from 'ethers'

import PriceList from '@/components/PriceList';
import SwapCard from '@/components/SwapCard';

import styles from './page.module.scss';

async function getQuote() {
  // const res = await fetch('https://api.example.com/...');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  // const data = await getQuote();

  return (
    <div className={styles.main}>
      <div className={styles.greenGlow} />
      <div className={styles.redGlow} />
      <SwapCard />
      <PriceList />
    </div>
  );
}
