import { useEffect, useState } from "react";
// import { ethers } from 'ethers'

import { PhantomProvider }from '../interfaces/PhantomProvider'
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "flowbite-react";

type ConnectToPhantomProps = {
  // key?: PhantomProvider,
  onConnect: any
  session: any
}

const ConnectToPhantom = ({ onConnect, session }: ConnectToPhantomProps ) => {
  const supabase = useSupabaseClient()

  const [provider, setProvider] = useState<PhantomProvider | undefined>(
    undefined
  );
  const [walletKey, setWalletKey] = useState<PhantomProvider | undefined>(
    undefined
  );
  
  const updateWalletAddress = async (key: string) => {
    const { user: { email }} = session

    let { data } = await supabase
      .from('users_info')
      .select('owner_email, spl_wallet')
      .eq('email', email)
      .single()

    if (data === null) {
      let { error } = await supabase.from('users_info').insert({ owner_email: email , spl_wallet: key}).single();
      if (error) {
        console.log(`Error - ${JSON.stringify(error)}`)
      }
    } else {
      console.log('Hello World' , JSON.stringify(data))
    }
  }

  /**
   * @description gets Phantom provider, if it exists
   */
  const getProvider = (): PhantomProvider | undefined => {
    if ("solana" in window) {
      // @ts-ignore
      const provider = window.solana as any;
      if (provider.isPhantom) return provider as PhantomProvider;
    }

    return;
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
        onConnect()
        response.publicKey.toString() && updateWalletAddress(response.publicKey.toString());
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
    }
    else setProvider(undefined);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {provider && !walletKey && (
          <Button pill={true} color="dark" onClick={connectWallet}>Connect to Phantom Wallet</Button>
        )}

        {provider && walletKey && (
          <Button pill={true} color="dark" onClick={disconnectWallet}>Disconnect</Button>
        )}

        {!provider && (
          <p>
            No provider found. Install{" "}
            <a href="https://phantom.app/">Phantom Browser extension</a>
          </p>
        )}
      </header>
    </div>
  );
}

export default ConnectToPhantom;