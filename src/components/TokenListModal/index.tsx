import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useAccount, useBalance } from 'wagmi';

import { useAllBalances } from '@/requests/hooks/useAllBalances';
import { useMarkets } from '@/requests/hooks/useMarkets';
import { IToken } from '@/requests/types';
import { ETHER_TOKEN } from '@/utils/const';

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
                  <div
                    className={styles.tokenRow}
                    key={'0x0'}
                    onClick={() => onTokenClick(ETHER_TOKEN)}
                  >
                    <div className={styles.tokenInfo}>
                      <Image
                        alt={ETHER_TOKEN.name}
                        height={24}
                        src={ETHER_TOKEN.logoURI}
                        width={24}
                      />
                      {ETHER_TOKEN.name}
                    </div>
                    <div>
                      {parseFloat(ethBalance?.formatted || '0').toFixed(4)}
                    </div>
                  </div>
                  {(balance || []).map((token) => (
                    <div
                      className={styles.tokenRow}
                      key={token.address}
                      onClick={() => onTokenClick(token)}
                    >
                      <div className={styles.tokenInfo}>
                        <Image
                          alt={token.name}
                          height={24}
                          src={token.logoURI}
                          width={24}
                        />
                        {token.name}
                      </div>
                      <div>{token.balance.toFixed(2)}</div>
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
                  <div className={styles.tokenInfo}>
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
