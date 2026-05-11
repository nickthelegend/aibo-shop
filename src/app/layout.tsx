'use client';
import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from '@/lib/wagmiConfig';
import { CartProvider } from '@/lib/cartStore';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,400&f[]=satoshi@900,700,500,400&display=swap"
          rel="stylesheet"
        />
        <title>AIBO SHOP — The Official Pet Adoption Marketplace</title>
        <meta name="description" content="Adopt your AI companion on Mantle. High-performance, yield-farming, battle-ready pets." />
      </head>
      <body>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider
              theme={darkTheme({
                accentColor: '#FFE17C',
                accentColorForeground: '#000000',
                borderRadius: 'medium',
                fontStack: 'system',
              })}
            >
              <CartProvider>
                {children}
              </CartProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
