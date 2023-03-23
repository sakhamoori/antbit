/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable import/no-extraneous-dependencies */
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';

import type { PhantomProvider } from '../interfaces/PhantomProvider';

type ConnectToPhantomProps = {
  onConnect: any;
  session: any;
};

const ConnectToPhantom = ({ onConnect, session }: ConnectToPhantomProps) => {
  const supabase = useSupabaseClient();

  const [provider, setProvider] = useState<PhantomProvider | undefined>(
    undefined
  );
  const [walletKey, setWalletKey] = useState<PhantomProvider | undefined>(
    undefined
  );

  const updateWalletAddress = async (key: string) => {
    const {
      user: { email },
    } = session;

    const { data } = await supabase
      .from('users_info')
      .select('owner_email, spl_wallet')
      .eq('owner_email', email)
      .single();

    // New Wallet
    if (data === null) {
      const { error } = await supabase
        .from('users_info')
        .insert({ owner_email: email, spl_wallet: key })
        .single();
      if (error) {
        throw error;
      }
    } else {
      // Update wallet
      const { error } = await supabase
        .from('users_info')
        .update({ spl_wallet: key })
        .eq('owner_email', email);

      if (error) {
        throw error;
      }
    }
  };

  /**
   * @description gets Phantom provider, if it exists
   */
  const getProvider = (): PhantomProvider | undefined => {
    if ('solana' in window) {
      // @ts-ignore
      const provider = window.solana as any;
      if (provider.isPhantom) {
        return provider as PhantomProvider;
      }
    }
  };

  /**
   * @description prompts user to connect wallet if it exists
   */
  const connectWallet = async () => {
    // @ts-ignore
    const { solana } = window;

    if (solana) {
      try {
        const response = await solana.connect();
        setWalletKey(response.publicKey.toString());
        onConnect(response.publicKey.toString());
        response.publicKey.toString() &&
          updateWalletAddress(response.publicKey.toString());
      } catch (err) {
        // { code: 4001, message: 'User rejected the request.' }
      }
    }
  };

  /**
   * @description disconnect Phantom wallet
   */
  const disconnectWallet = async () => {
    // @ts-ignore
    const { solana } = window;

    if (walletKey && solana) {
      await (solana as PhantomProvider).disconnect();
      setWalletKey(undefined);
    }
  };

  // detect phantom provider exists
  useEffect(() => {
    const provider = getProvider();

    if (provider) {
      setProvider(provider);
    } else setProvider(undefined);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {provider && !walletKey && (
        <Button color="dark" onClick={connectWallet} style={{ width: '200px' }}>
          Connect Phantom Wallet
        </Button>
      )}

      {provider && walletKey && (
        <>
          <Button pill={true} color="dark" onClick={disconnectWallet}>
            Disconnect
          </Button>
        </>
      )}

      {!provider && (
        <p>
          No provider found. Install{' '}
          <a href="https://phantom.app/">Phantom Browser extension</a>
        </p>
      )}
    </div>
  );
};

export default ConnectToPhantom;
