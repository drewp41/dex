'use client';

import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { fetchBalance } from '@wagmi/core';
import Image from 'next/image';
import walletIcon from 'public/images/wallet.svg';

import TokenListModal from '@/components/TokenListModal';
import useMultiToken from '@/hooks/useMultiToken';
import { ETHER_TOKEN } from '@/utils/const';

import styles from '../index.module.scss';

export default function TokenInput() {
  const [val, setVal] = useState<string>('');
  const [isTokenListModalOpen, setIsTokenListModalOpen] =
    useState<boolean>(false);
  const [token, setToken] = useState<any>(ETHER_TOKEN);
  const { data } = useMultiToken({
    addresses: ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'],
  });

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

  useEffect(() => {
    console.log('DATA', data);
    const f = async () => {
      const balance = await fetchBalance({
        address: '0x49AEB88Dd4188e7A0891b14281229cd5B385C5eF',
        token: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      });
      console.log('BALANCE', balance);
      return balance;
    };
    f();
  }, [data]);

  // const { data, isError, isLoading } = useToken({
  //   address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  // });

  // const { data, isError, isLoading } = useContractRead({
  //   address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  //   abi: erc20ABI,
  //   functionName: 'decimals',
  //   onError: (err) => console.log(err),
  // });

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
                  src={token.image}
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
