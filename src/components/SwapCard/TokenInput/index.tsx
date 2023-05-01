import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import walletIcon from 'public/images/wallet.svg';
import { useAccount, useBalance as useEthBalance } from 'wagmi';

import TokenListModal from '@/components/TokenListModal';
import { searchToken } from '@/requests/requests';
import { IBalanceToken, IToken } from '@/requests/types';
import { formatNum, formatPrice, isBalanceToken } from '@/utils/func';

import styles from '../index.module.scss';

interface TokenInputProps {
  first: boolean;
  token: IToken | IBalanceToken | null;
  setToken: React.Dispatch<React.SetStateAction<IToken | IBalanceToken | null>>;
  amount: string;
  setAmount: (arg0: string) => void;
}

export default function TokenInput(props: TokenInputProps) {
  const { token, setToken, amount, setAmount } = props;
  const [isTokenListModalOpen, setIsTokenListModalOpen] =
    useState<boolean>(false);
  const { address } = useAccount();
  const { data: ethBalance } = useEthBalance({ address });
  const [isTokenPriceLoading, setIsTokenPriceLoading] = useState(false);

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
    if (token === null) {
      return '';
    }
    if (token.symbol === 'ETH') {
      return formatNum(Number(ethBalance?.formatted), 4);
    } else if (isBalanceToken(token)) {
      return formatNum(token.balance, 4);
    }
    return 0.0;
  };

  const tokenPrice = () => {
    if (!amount || token == null) {
      return null;
    }
    if ('price' in token && token.price) {
      return formatPrice(Number(amount) * token.price.usd);
    }
    return '$0.00';
  };

  useEffect(() => {
    const fetchTokenPrice = async () => {
      setIsTokenPriceLoading(true);
      const res = await searchToken(token!.address);
      if (res.length === 1) {
        const t = res[0];
        console.log(token);
        console.log(t);
        setToken((prev) => ({
          ...prev!,
          price: t.price,
        }));
      }
      setIsTokenPriceLoading(false);
    };
    // Balance tokens already have a price
    if (token !== null && !isBalanceToken(token)) {
      fetchTokenPrice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token?.symbol]);

  return (
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
                  <div className={styles.tokenSymbol}>
                    {token.symbol.toUpperCase()}
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
          {token !== null && (
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
