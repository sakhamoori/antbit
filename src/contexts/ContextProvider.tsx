import type {
  WalletAdapterNetwork,
  WalletError,
} from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import {
  PhantomWalletAdapter,
  // LedgerWalletAdapter,
  // SlopeWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import dynamic from 'next/dynamic';
import type { FC, ReactNode } from 'react';
import { useCallback, useMemo } from 'react';

import { AutoConnectProvider, useAutoConnect } from './AutoConnectProvider';
import {
  NetworkConfigurationProvider,
  useNetworkConfiguration,
} from './NetworkConfigurationProvider';

const ReactUIWalletModalProviderDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletModalProvider,
  { ssr: true }
);

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { autoConnect } = useAutoConnect();
  const { networkConfiguration } = useNetworkConfiguration();
  const network = networkConfiguration as WalletAdapterNetwork;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

  const onError = useCallback((error: WalletError) => {
    // notify({
    //   type: 'error',
    //   message: error.message ? `${error.name}: ${error.message}` : error.name,
    // });
    console.error(error);
  }, []);

  return (
    // TODO: updates needed for updating and referencing endpoint: wallet adapter rework
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        wallets={wallets}
        onError={onError}
        autoConnect={autoConnect}
      >
        <ReactUIWalletModalProviderDynamic>
          {children}
        </ReactUIWalletModalProviderDynamic>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <NetworkConfigurationProvider>
        <AutoConnectProvider>
          <WalletContextProvider>{children}</WalletContextProvider>
        </AutoConnectProvider>
      </NetworkConfigurationProvider>
    </>
  );
};
