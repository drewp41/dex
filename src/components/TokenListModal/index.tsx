import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import Image from 'next/image';

import { BACKUP_TOKEN_LIST } from '@/utils/const';

import styles from './index.module.scss';

async function getTokenList() {
  const params = new URLSearchParams({
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: '250',
    page: '1',
    sparkline: 'false',
    locale: 'en',
  });

  const url = `https://api.coingecko.com/api/v3/coins/markets?${params.toString()}`;

  const res = await fetch(url, { method: 'GET' });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    return BACKUP_TOKEN_LIST;
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

interface TokenListModalProps {
  isOpen: boolean;
  closeModal: () => void;
  trigger: React.ReactNode;
}

export default function TokenListModal({
  isOpen,
  closeModal,
  trigger,
}: TokenListModalProps) {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const d = await getTokenList();
      setData(d);
    };
    fetchData();
  }, []);

  return (
    <Dialog.Root open={isOpen} onOpenChange={() => isOpen && closeModal()}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <Dialog.Title className={styles.title}>Select Token</Dialog.Title>
          <input className={styles.input} placeholder='USDC or 0xa0b86...' />
          <div className={styles.tokenListContainer}>
            <div className={styles.topBlur} />
            <div className={styles.tokenList}>
              {data.map((token: any) => (
                <div className={styles.tokenRow} key={token.id}>
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
