'use client';

import { useEffect, useState } from 'react';
import { ArrowsUpDownIcon } from '@heroicons/react/24/solid';

import useTokenState from '@/hooks/useTokenState';

import SwapBtn from './SwapBtn';
import TokenInput from './TokenInput';

import styles from './index.module.scss';

export default function SwapCard() {
  const {
    tokenState,
    setFirstTokenState,
    setSecondTokenState,
    switchTokens,
    firstTokenChanged,
  } = useTokenState();
  const [rotate, setRotate] = useState(false);

  const onSwitchTokensClick = () => {
    setRotate(true);
    switchTokens();
  };

  useEffect(() => {
    // Then update the second token
    if (firstTokenChanged % 2 === 0) {
    } else {
    }
  }, [firstTokenChanged]);

  return (
    <>
      <div className={`${styles.card} grey-border-box no-hover`}>
        <TokenInput
          setTokenState={setFirstTokenState}
          tokenState={tokenState?.first!}
          isFirst
        />
        <div className={styles.switchTokensContainer}>
          <div
            className={styles.switchTokensBtn}
            onAnimationEnd={() => setRotate(false)}
            onClick={onSwitchTokensClick}
          >
            <ArrowsUpDownIcon className={rotate ? styles.rotate : ''} height={20} />
          </div>
        </div>
        <TokenInput
          isFirst={false}
          setTokenState={setSecondTokenState}
          tokenState={tokenState?.second!}
        />
        <SwapBtn />
      </div>
    </>
  );
}
