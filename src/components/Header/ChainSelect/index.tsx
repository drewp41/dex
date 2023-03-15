'use client';

import { forwardRef, ReactNode, Ref, useEffect, useState } from 'react';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import Image from 'next/image';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';

import Arbitrum from '@/assets/images/arbitrum.svg';
import Mainnet from '@/assets/images/mainnet.svg';
import Optimism from '@/assets/images/optimism.svg';
import Polygon from '@/assets/images/polygon.svg';
import { Chain, CHAIN_ID_MAP, CHAIN_LIST } from '@/utils/const';
import { fetchChainFromLocalStorage } from '@/utils/func';

import styles from './index.module.scss';

type SelectItemProps = {
  value: Chain;
  children: ReactNode;
};

const CHAIN_IMAGE_MAP: Record<Chain, any> = {
  arbitrum: Arbitrum,
  homestead: Mainnet,
  optimism: Optimism,
  matic: Polygon,
};

export default function ChainSelect() {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { isConnected } = useAccount();

  function initChain() {
    if (isConnected) {
      return chain?.network!;
    } else {
      return fetchChainFromLocalStorage();
    }
  }

  const [currChain, setCurrChain] = useState(() => initChain());

  const SelectItem = forwardRef(
    ({ value, children }: SelectItemProps, ref: Ref<HTMLDivElement>) => {
      return (
        <Select.Item className={styles.selectItem} ref={ref} value={value}>
          <Select.ItemText>
            <div className={styles.selectItemText}>{children}</div>
          </Select.ItemText>
          <Select.ItemIndicator className={styles.selectItemIndicator}>
            <CheckIcon />
          </Select.ItemIndicator>
        </Select.Item>
      );
    }
  );
  SelectItem.displayName = 'SelectItem';

  const onChainChange = (value: string) => {
    if (isConnected) {
      switchNetwork?.(CHAIN_ID_MAP[value as Chain]);
    } else {
      setCurrChain(value as Chain);
      window.localStorage.setItem('currChain', JSON.stringify(value));
    }
  };

  useEffect(() => {
    if (isConnected) {
      setCurrChain(chain?.network!);
      window.localStorage.setItem('currChain', JSON.stringify(chain?.network!));
    } else {
      setCurrChain(fetchChainFromLocalStorage());
    }
  }, [chain, isConnected, setCurrChain]);

  return (
    <Select.Root
      defaultValue='homestead'
      value={currChain}
      onValueChange={onChainChange}
    >
      <Select.Trigger
        aria-label='chain'
        className={`${styles.selectTrigger} grey-border-box`}
      >
        <Select.Value placeholder='Select a chain' />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={styles.selectContent} position='popper'>
          <Select.Viewport className={styles.selectViewport}>
            {CHAIN_LIST.map((chainObj) => (
              <SelectItem key={chainObj.id} value={chainObj.network as Chain}>
                <Image
                  alt={chainObj.network}
                  className={styles.chainIcon}
                  height={24}
                  src={CHAIN_IMAGE_MAP[chainObj.network as Chain]}
                  width={24}
                />
                {chainObj.name}
              </SelectItem>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
