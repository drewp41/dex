'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import walletIcon from 'public/images/wallet.svg';
import { useAccount, useBalance as useEthBalance } from 'wagmi';

import TokenListModal from '@/components/TokenListModal';
import { IBalanceToken, IToken } from '@/requests/types';
import { ETHER_TOKEN } from '@/utils/const';
import { formatNum, formatPrice } from '@/utils/func';

import styles from '../index.module.scss';

function isBalanceToken(token: IToken | IBalanceToken): token is IBalanceToken {
  return 'balance' in token;
}

interface TokenInputProps {
  defaultToken: string | null;
}

export default function TokenInput(props: TokenInputProps) {
  const { defaultToken } = props;
  const [amount, setAmount] = useState<string>('');
  const [isTokenListModalOpen, setIsTokenListModalOpen] =
    useState<boolean>(false);
  const [token, setToken] = useState<IToken | IBalanceToken | null>(
    defaultToken ? ETHER_TOKEN : null
  );
  const { address } = useAccount();
  const { data: ethBalance } = useEthBalance({ address });

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
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

  const tokenBalance = () => {
    if (token.symbol === 'ETH') {
      return formatNum(Number(ethBalance?.formatted), 4);
    } else if (isBalanceToken(token)) {
      return formatNum(token.balance, 4);
    }
    return 0.0;
  };

  const tokenPrice = () => {
    if (!amount) {
      return null;
    }
    if (isBalanceToken(token)) {
      return formatPrice(Number(amount) * token.price.usd);
    }
    return '$0.00';
  };

  return (
    <>
      <div className={styles.inputGroup}>
        <div className={styles.inputRowTop}>
          <input
            className={styles.input}
            placeholder='0'
            type='number'
            value={amount}
            onChange={onAmountChange}
            onKeyDown={blockCertainChars}
          />
          <TokenListModal
            closeModal={closeTokenListModal}
            isOpen={isTokenListModalOpen}
            setToken={setToken}
            trigger={
              <button className={styles.tokenBtn} onClick={onTokenBtnClick}>
                {token !== null ? (
                  <>
                    <Image
                      alt={token.name}
                      height={24}
                      src={token.logoURI}
                      width={24}
                    />
                    <div>{token.symbol.toUpperCase()}</div>
                    <ChevronDownIcon className={styles.chevron} />
                  </>
                ) : (
                  <div className={styles.selectTokenContainer}>
                    <div className={styles.selectToken}>Select token</div>
                    <ChevronDownIcon className={styles.chevronSmall} />
                  </div>
                )}
              </button>
            }
          />
        </div>
        <div className={styles.inputRowBottom}>
          <div className={styles.dollar}>{tokenPrice()}</div>
          {token !== null && (
            <div className={styles.balance}>
              <Image
                alt='wallet icon'
                height={20}
                src={walletIcon}
                width={20}
              />
              {tokenBalance()}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
