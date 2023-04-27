import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useAccount } from 'wagmi';

import { useBalance } from '@/requests/hooks/useBalance';
import { useMarkets } from '@/requests/hooks/useMarkets';

import styles from './index.module.scss';

interface TokenListModalProps {
  isOpen: boolean;
  closeModal: () => void;
  trigger: React.ReactNode;
  setToken: React.Dispatch<React.SetStateAction<string>>;
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
  const { balance } = useBalance(address);

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
              {markets.map((token) => (
                <div
                  className={styles.tokenRow}
                  key={token.id}
                  onClick={() => onTokenClick(token)}
                >
                  <div className={styles.tokenInfo}>
                    <Image
                      alt={token.name}
                      height={24}
                      src={token.image}
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
