'use client';

import { useState } from 'react';
import Image from 'next/image';

import styles from '../index.module.scss';

export default function SwapIcon() {
  const [rotate, setRotate] = useState(false);

  return (
    <Image
      alt='Swap Icon'
      className={`${styles.icon} ${rotate ? styles.rotate : ''}`}
      height={36}
      src='/images/swap-icon.svg'
      width={36}
      priority
      onAnimationEnd={() => setRotate(false)}
      onClick={() => setRotate(true)}
    />
  );
}
