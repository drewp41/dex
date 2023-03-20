'use client';

import { forwardRef, ReactNode, Ref, useEffect, useState } from 'react';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import Image from 'next/image';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';

import { CHAIN_LIST } from '@/utils/const';
import { fetchChainFromLocalStorage } from '@/utils/func';

import styles from './index.module.scss';

type SelectItemProps = {
  value: string;
  children: ReactNode;
};

export default function ChainSelect() {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { isConnected } = useAccount();

  function initChain() {
    if (isConnected) {
      return chain?.id.toString();
    } else {
      return fetchChainFromLocalStorage();
    }
  }

  const [currChain, setCurrChain] = useState<string>(() => initChain());

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

  const onChainChange = (chainId: string) => {
    if (isConnected) {
      switchNetwork?.(parseInt(chainId));
    } else {
      switchNetwork?.(parseInt(chainId));
      setCurrChain(chainId);
      window.localStorage.setItem('currChain', JSON.stringify(chainId));
    }
  };

  useEffect(() => {
    if (isConnected && chain) {
      setCurrChain(chain.id.toString());
    }
  }, [chain, isConnected]);

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
          <Select.Viewport
            className={`grey-border-box no-hover flipped ${styles.selectViewport}`}
          >
            {CHAIN_LIST.map((chainObj) => (
              <SelectItem key={chainObj.id} value={chainObj.id.toString()}>
                <Image
                  alt={chainObj.network}
                  className={styles.chainIcon}
                  height={24}
                  src={`/images/${chainObj.network}.svg`}
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
