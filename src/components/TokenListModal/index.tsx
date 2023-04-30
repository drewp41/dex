import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useAccount, useBalance } from 'wagmi';

import { useAllBalances } from '@/requests/hooks/useAllBalances';
import { useMarkets } from '@/requests/hooks/useMarkets';
import { IToken } from '@/requests/types';
import { formatNum } from '@/utils/func';

import styles from './index.module.scss';

interface TokenListModalProps {
  isOpen: boolean;
  closeModal: () => void;
  trigger: React.ReactNode;
  setToken: (arg0: IToken) => void;
}

export default function TokenListModal({
  isOpen,
  closeModal,
  trigger,
  setToken,
}: TokenListModalProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { markets, onMarketsSearch } = useMarkets();
  const { address } = useAccount();
  const { balance } = useAllBalances(address);
  const { data: ethBalance } = useBalance({ address });

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onMarketsSearch(e.target.value);
  };

  const onTokenClick = (token: any) => {
    setToken(token);
    closeModal();
  };

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
              {!searchQuery && (
                <>
                  {(balance || []).map((token) => (
                    <div
                      className={styles.tokenBalanceRow}
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
                        <div className={styles.tokenSymbol}>{token.symbol}</div>
                      </div>
                      <div className={styles.tokenBalanceInfo}>
                        <div className={styles.tokenBalance}>
                          {token.symbol === 'ETH'
                            ? formatNum(Number(ethBalance?.formatted), 4)
                            : token.balance.toFixed(2)}
                        </div>
                        <div className={styles.tokenPrice}>
                          {`$${
                            token.symbol === 'ETH'
                              ? formatNum(
                                  token.price.usd *
                                    Number(ethBalance?.formatted)
                                )
                              : formatNum(token.price.usd * token.balance)
                          }`}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className={styles.dividingLine} />
                </>
              )}
              {markets.map((token) => (
                <div
                  className={styles.tokenRow}
                  key={token.symbol}
                  onClick={() => onTokenClick(token)}
                >
                  <div className={styles.tokenNameLogo}>
                    <Image
                      alt={token.name}
                      height={24}
                      src={token.logoURI}
                      width={24}
                    />
                    {token.name}
                  </div>
                </div>
              ))}
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
