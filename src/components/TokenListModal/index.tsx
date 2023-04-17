import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import Image from 'next/image';

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
  const [originalData, setOriginalData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    const filteredData = originalData.filter((token: any) => {
      return (
        token.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        token.symbol.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setData(filteredData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const d = await (await fetch('/api/markets/')).json();
      setData(d);
      setOriginalData(d);
    };
    fetchData();
  }, []);

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
              {data.map((token: any) => (
                <div
                  className={styles.tokenRow}
                  key={token.id}
                  onClick={() => onTokenClick(token)}
                >
                  <Image
                    alt={token.name}
                    height={24}
                    src={token.image}
                    width={24}
                  />
                  {token.name}
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
