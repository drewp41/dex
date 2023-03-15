'use client';

import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import {
  configureChains,
  createClient,
  // createStorage,
  WagmiConfig,
} from 'wagmi';
// import { InjectedConnector } from 'wagmi/connectors/injected';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { CHAIN_LIST } from '@/utils/const';

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;

const { chains } = configureChains(CHAIN_LIST, [
  alchemyProvider({ apiKey: alchemyId!, priority: 0 }),
  publicProvider({ priority: 1 }),
]);

// const client = createClient({
//   autoConnect: true,
//   connectors: [new InjectedConnector({ chains })],
//   provider,
//   storage: createStorage({ storage: window.localStorage }),
// });

const client = createClient(
  getDefaultClient({
    appName: 'dex',
    alchemyId,
    chains,
    autoConnect: true,
  })
  // {
  //   autoConnect: true,
  //   connectors: [new InjectedConnector({ chains })],
  //   provider,
  //   storage: createStorage({ storage: window.localStorage }),
  // }
);

interface IProviders {
  children: React.ReactNode;
}

export const Providers = ({ children }: IProviders) => {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider
        customTheme={{
          '--ck-font-family':
            'var(--gilroy), "Times New Roman", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
        }}
      >
        {children}
      </ConnectKitProvider>
    </WagmiConfig>
  );
};
