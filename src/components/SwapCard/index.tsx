'use client';

import { useState } from 'react';
import { ArrowsUpDownIcon } from '@heroicons/react/24/solid';

import { IBalanceToken, IToken } from '@/requests/types';
import { ETHER_TOKEN } from '@/utils/const';

import SwapBtn from './SwapBtn';
import TokenInput from './TokenInput';

import styles from './index.module.scss';

export default function SwapCard() {
  const [firstToken, setFirstoken] = useState<IToken | IBalanceToken | null>(
    ETHER_TOKEN
  );
  const [secondToken, setSecondToken] = useState<IToken | IBalanceToken | null>(
    null
  );
  const [firstAmount, setFirstAmount] = useState<string>('');
  const [secondAmount, setSecondAmount] = useState<string>('');

  const [rotate, setRotate] = useState(false);

  const onSwitchTokensClick = () => {
    setRotate(true);

    const tempFirstToken = firstToken;
    setFirstoken(secondToken);
    setSecondToken(tempFirstToken);

    const tempFirstAmount = firstAmount;
    setFirstAmount(secondAmount);
    setSecondAmount(tempFirstAmount);
  };

  return (
    <>
      <div className={`${styles.card} grey-border-box no-hover`}>
        <TokenInput
          amount={firstAmount}
          setAmount={setFirstAmount}
          setToken={setFirstoken}
          token={firstToken}
          first
        />
        <div className={styles.switchTokensContainer}>
          <div
            className={styles.switchTokensBtn}
            onAnimationEnd={() => setRotate(false)}
            onClick={onSwitchTokensClick}
          >
            <ArrowsUpDownIcon className={rotate ? styles.rotate : ''} />
          </div>
        </div>
        <TokenInput
          amount={secondAmount}
          first={false}
          setAmount={setSecondAmount}
          setToken={setSecondToken}
          token={secondToken}
        />
        <SwapBtn />
      </div>
    </>
  );
}
