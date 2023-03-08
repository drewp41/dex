'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useNetwork } from 'wagmi';

import Arbitrum from '@/assets/images/arbitrum.svg';
import Mainnet from '@/assets/images/mainnet.svg';
import Optimism from '@/assets/images/optimism.svg';
import Polygon from '@/assets/images/polygon.svg';

import styles from './index.module.scss';

export default function ChainSelect() {
  const { chain } = useNetwork();

  useEffect(() => {
    console.log(chain);
  }, [chain]);

  return (
    <div className={styles.chainContainer}>
      <div className={styles.chainCircle}>
        <Image alt='mainnet' height={30} src={Mainnet} width={30} />
      </div>
      <div className={styles.chainCircle}>
        <Image alt='arbitrum' height={30} src={Arbitrum} width={30} />
      </div>
      <div className={styles.chainCircle}>
        <Image alt='optimism' height={30} src={Optimism} width={30} />
      </div>
      <div className={styles.chainCircle}>
        <Image alt='polygon' height={30} src={Polygon} width={30} />
      </div>
    </div>
  );
}
