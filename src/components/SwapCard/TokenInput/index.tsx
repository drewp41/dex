import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import walletIcon from 'public/images/wallet.svg';
import { useAccount, useBalance as useEthBalance } from 'wagmi';

import TokenListModal from '@/components/TokenListModal';
import { searchToken } from '@/requests/requests';
import { ITokenState } from '@/requests/types';
import { formatNum, formatPrice, isBalanceToken } from '@/utils/func';

import styles from '../index.module.scss';

interface TokenInputProps {
  isFirst: boolean;
  tokenState: ITokenState;
  setTokenState: (newTokenState: ITokenState) => void;
}

export default function TokenInput(props: TokenInputProps) {
  const { isFirst, tokenState, setTokenState } = props;
  const [isTokenListModalOpen, setIsTokenListModalOpen] =
    useState<boolean>(false);
  const { address } = useAccount();
  const { data: ethBalance } = useEthBalance({ address });
  const [isTokenPriceLoading, setIsTokenPriceLoading] = useState(false);

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenState({
      ...tokenState,
      amount: e.target.value,
    });
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
    if (tokenState.token === null) {
      return '';
    }
    if (tokenState.token.symbol === 'ETH') {
      return formatNum(Number(ethBalance?.formatted), 4);
    } else if (isBalanceToken(tokenState.token)) {
      return formatNum(tokenState.token.balance, 4);
    }
    return 0.0;
  };

  const tokenPrice = () => {
    if (!tokenState.amount || tokenState.token == null) {
      return null;
    }
    if ('price' in tokenState.token && tokenState.token.price) {
      return formatPrice(
        Number(tokenState.amount) * tokenState.token.price.usd
      );
    }
    return '$0.00';
  };

  useEffect(() => {
    const fetchTokenPrice = async () => {
      setIsTokenPriceLoading(true);
      const res = await searchToken(tokenState.token!.address);
      if (res.length === 1) {
        const t = res[0];
        // might need to just set price with t.price ?
        setTokenState({
          ...tokenState,
          token: t,
        });
      }
      setIsTokenPriceLoading(false);
    };
    // Balance tokens already have a price
    if (tokenState.token !== null && !isBalanceToken(tokenState.token)) {
      fetchTokenPrice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenState.token?.symbol]);

  return (
    <div className={styles.inputGroup}>
      <div className={styles.inputRowTop}>
        <input
          className={styles.input}
          placeholder='0'
          type='number'
          value={tokenState.amount}
          onChange={onAmountChange}
          onKeyDown={blockCertainChars}
        />
        <TokenListModal
          closeModal={closeTokenListModal}
          isFirst={isFirst}
          isOpen={isTokenListModalOpen}
          setTokenState={setTokenState}
          tokenState={tokenState}
          trigger={
            <button className={styles.tokenBtn} onClick={onTokenBtnClick}>
              {tokenState.token !== null ? (
                <>
                  <Image
                    alt={tokenState.token.name}
                    height={24}
                    src={tokenState.token.logoURI}
                    width={24}
                  />
                  <div className={styles.tokenSymbol}>
                    {tokenState.token.symbol.toUpperCase()}
                  </div>
                </>
              ) : (
                <div className={styles.selectToken}>Select token</div>
              )}
              <ChevronDownIcon
                className={styles.chevron}
                height={16}
                width={16}
              />
            </button>
          }
        />
      </div>
      <div className={styles.inputRowBottom}>
        <div className={styles.price}>
          {isTokenPriceLoading ? <Skeleton width={50} /> : tokenPrice()}
        </div>
        <div className={styles.balance}>
          {tokenState.amount !== null && (
            <Image
              alt='wallet icon'
              className={styles.walletIcon}
              height={20}
              src={walletIcon}
              width={20}
            />
          )}
          {tokenBalance()}
        </div>
      </div>
    </div>
  );
}
