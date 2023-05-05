import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useAccount, useBalance as useEthBalance } from 'wagmi';

import useTokenState from '@/hooks/useTokenState';
import { useMarkets } from '@/requests/hooks/useMarkets';
import { usePortfolio } from '@/requests/hooks/usePortfolio';
import { useTokenList } from '@/requests/hooks/useTokenList';
import { searchToken } from '@/requests/requests';
import { IBalanceToken, IToken, ITokenState } from '@/requests/types';
import {
  compressAddress,
  formatNum,
  formatPrice,
  isBalanceToken,
} from '@/utils/func';

import styles from './index.module.scss';

interface TokenListModalProps {
  isOpen: boolean;
  closeModal: () => void;
  trigger: React.ReactNode;
  tokenState: ITokenState;
  setTokenState: (newTokenState: ITokenState) => void;
  // Whether is it first token input, or not
  isFirst: boolean;
}

export default function TokenListModal({
  isOpen,
  closeModal,
  trigger,
  tokenState,
  setTokenState,
  isFirst,
}: TokenListModalProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { markets } = useMarkets();
  const { address } = useAccount();
  const { balance, portfolioSet } = usePortfolio(address);
  const { data: ethBalance } = useEthBalance({ address });
  const [searchResults, setSearchResults] = useState<IToken[]>([]);
  const { tokenNameMap } = useTokenList();
  // Used to disable the token if it's selected in the other token input
  const { isCurrSelectedToken, isOtherSelectedToken } = useTokenState();

  const onSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    let res = await searchToken(e.target.value);
    res = res.filter((token) => !tokenNameMap[token.address.toLowerCase()]);
    setSearchResults(res);
  };

  // Is IToken if it's clicked on in the top 100 or search list,
  // Is IBalance token if clicked on from portfolio section
  const onTokenClick = (token: IToken | IBalanceToken) => {
    setTokenState({
      ...tokenState,
      token: token,
    });
    closeModal();
  };

  const tokenRow = (token: IToken, showAddress: boolean) => (
    <div
      className={`${styles.tokenRow} ${
        isCurrSelectedToken(token.address, isFirst) && styles.noPointerEvents
      }`}
      key={token.address}
      onClick={() => onTokenClick(token)}
    >
      <Image
        alt={token.name}
        className={styles.tokenImg}
        height={30}
        src={token.logoURI}
        width={30}
      />
      <div className={styles.tokenNameInfo}>
        <div className={styles.tokenName}>{token.name}</div>
        <div className={styles.tokenSymbol}>
          {showAddress ? compressAddress(token.address) : token.symbol}
        </div>
      </div>
      {/* Show token balance and value */}
      {isBalanceToken(token) && (
        <div className={styles.tokenBalanceInfo}>
          <div className={styles.tokenBalance}>
            {token.symbol === 'ETH'
              ? formatNum(Number(ethBalance?.formatted), 4)
              : formatNum(token.balance, 2)}
          </div>
          <div className={styles.tokenPrice}>
            {token.symbol === 'ETH'
              ? formatPrice(token.price.usd * Number(ethBalance?.formatted))
              : formatPrice(token.price.usd * token.balance)}
          </div>
        </div>
      )}
      {isCurrSelectedToken(token.address, isFirst) && (
        <>
          <div className={styles.disabled} />
          <CheckIcon className={styles.check} height={24} width={24} />
        </>
      )}
      {isOtherSelectedToken(token.address, isFirst) && (
        <div className={styles.disabled} />
      )}
    </div>
  );

  return (
    <Dialog.Root open={isOpen} onOpenChange={() => isOpen && closeModal()}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <Dialog.Title className={styles.title}>Select Token</Dialog.Title>
          <input
            className={styles.input}
            placeholder='USDC or 0xa0b86...'
            value={searchQuery}
            onChange={onSearchChange}
          />
          <div className={styles.tokenListContainer}>
            <div className={styles.topBlur} />
            <div className={styles.tokenList}>
              {!searchQuery ? (
                <>
                  {(balance || []).map((token) => tokenRow(token, false))}
                  <div className={styles.dividingLine} />
                  {markets.map(
                    (token) =>
                      !portfolioSet.has(token.address) && tokenRow(token, false)
                  )}
                </>
              ) : (
                searchResults.map((token) =>
                  tokenRow(token, searchQuery.startsWith('0x'))
                )
              )}
            </div>
          </div>
          <Dialog.Close asChild>
            <button aria-label='Close' className={styles.closeBtn}>
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
