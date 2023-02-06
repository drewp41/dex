'use client'

import { WagmiConfig, createClient } from 'wagmi'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'
import { useEffect } from 'react'

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID

const client = createClient(
  getDefaultClient({
    appName: 'dex',
    alchemyId,
  })
)

interface IProviders {
  children: React.ReactNode
}

export const Providers = ({ children }: IProviders) => {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider
        customTheme={{
          '--ck-font-family':
            '"Gilroy", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
        }}
      >
        {children}
      </ConnectKitProvider>
    </WagmiConfig>
  )
}
