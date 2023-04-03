'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';

import TokenListModal from '@/components/TokenListModal';

import styles from '../index.module.scss';

export default function TokenInput() {
  const [val, setVal] = useState<string>('');
  const [isTokenListModalOpen, setIsTokenListModalOpen] =
    useState<boolean>(false);

  const onValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  const blockCertainChars = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'e' || e.key === '+' || e.key === '-') {
      e.preventDefault();
    }
  };

  const onTokenBtnClick = () => {
    setIsTokenListModalOpen(true);
  };

  const closeTokenListModal = () => {
    setIsTokenListModalOpen(false);
  };

  return (
    <>
      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          placeholder='0'
          type='number'
          value={val}
          onChange={onValChange}
          onKeyDown={blockCertainChars}
        />
        <TokenListModal
          closeModal={closeTokenListModal}
          isOpen={isTokenListModalOpen}
          trigger={
            <button className={styles.tokenBtn} onClick={onTokenBtnClick}>
              ETH
              <ChevronDownIcon />
            </button>
          }
        />
      </div>
    </>
  );
}
