'use client';

import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import { createClient, WagmiConfig } from 'wagmi';

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;

const client = createClient(
  getDefaultClient({
    appName: 'dex',
    alchemyId,
  })
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
