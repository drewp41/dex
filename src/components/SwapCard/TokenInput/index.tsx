import { useState } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';

import styles from '../index.module.scss';

export default function TokenInput() {
  const [val, setVal] = useState('');

  const onValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  const blockCertainChars = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'e' || e.key === '+' || e.key === '-') {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.inputGroup}>
      <input
        className={styles.input}
        placeholder='0'
        type='number'
        value={val}
        onChange={onValChange}
        onKeyDown={blockCertainChars}
      />
      <button className={styles.tokenBtn}>
        ETH
        <ChevronDownIcon />
      </button>
    </div>
  );
}
