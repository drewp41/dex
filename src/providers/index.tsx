'use client';

import { ConnectKitProvider } from 'connectkit';
import {
  configureChains,
  createClient,
  createStorage,
  WagmiConfig,
} from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { CHAIN_LIST } from '@/utils/const';

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;

const { chains, provider } = configureChains(CHAIN_LIST, [
  alchemyProvider({ apiKey: alchemyId!, priority: 0 }),
  publicProvider({ priority: 1 }),
]);

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'Swap Aggregator',
      },
    }),
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '5ad1a034250732d55e41c87bc8835e8d',
      },
    }),
  ],
  provider,
  storage: createStorage({ storage: window.localStorage }),
});

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
