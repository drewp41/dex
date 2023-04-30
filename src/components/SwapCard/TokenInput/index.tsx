'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import walletIcon from 'public/images/wallet.svg';
import { useAccount } from 'wagmi';

import TokenListModal from '@/components/TokenListModal';
import { useAllBalances } from '@/requests/hooks/useAllBalances';
import { useTokenList } from '@/requests/hooks/useTokenList';
import { IToken } from '@/requests/types';
import { ETHER_TOKEN } from '@/utils/const';

import styles from '../index.module.scss';

export default function TokenInput() {
  const [val, setVal] = useState<string>('');
  const [isTokenListModalOpen, setIsTokenListModalOpen] =
    useState<boolean>(false);
  const [token, setToken] = useState<IToken>(ETHER_TOKEN);
  const { address } = useAccount();
  const { balance } = useAllBalances(address);

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
        <div className={styles.inputRowTop}>
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
            setToken={setToken}
            trigger={
              <button className={styles.tokenBtn} onClick={onTokenBtnClick}>
                <Image
                  alt={token.name}
                  height={24}
                  src={token.logoURI}
                  width={24}
                />
                {token.symbol.toUpperCase()}
                <ChevronDownIcon className={styles.chevron} />
              </button>
            }
          />
        </div>
        <div className={styles.inputRowBottom}>
          <div className={styles.dollar}>$0.00</div>
          <div className={styles.balance}>
            <Image alt='wallet icon' height={20} src={walletIcon} width={20} />
            0.00
          </div>
        </div>
      </div>
    </>
  );
}
