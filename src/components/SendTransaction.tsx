/* eslint-disable import/no-extraneous-dependencies */
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import type { TransactionSignature } from '@solana/web3.js';
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js';
import { Button } from 'flowbite-react';
import type { FC } from 'react';
import { useCallback } from 'react';

export const SendTransaction: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const onClick = useCallback(async () => {
    if (!publicKey) {
      // notify({ type: 'error', message: `Wallet not connected!` });
      console.log('error', `Send Transaction: Wallet not connected!`);
      return;
    }

    let signature: TransactionSignature = '';
    try {
      // Create instructions to send, in this case a simple transfer
      const instructions = [
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(
            'GCAfdoG1VbyRhTUnnHBp2wtmpmxpiU42VMyFj5GjKEyz'
          ),
          lamports: (1 * LAMPORTS_PER_SOL) / 100,
        }),
      ];

      // Get the lates block hash to use on our transaction and confirmation
      const latestBlockhash = await connection.getLatestBlockhash();

      // Create a new TransactionMessage with version and compile it to legacy
      const messageLegacy = new TransactionMessage({
        payerKey: publicKey,
        recentBlockhash: latestBlockhash.blockhash,
        instructions,
      }).compileToLegacyMessage();

      // Create a new VersionedTransacction which supports legacy and v0
      const transation = new VersionedTransaction(messageLegacy);

      // Send transaction and await for signature
      signature = await sendTransaction(transation, connection);

      // Send transaction and await for signature
      await connection.confirmTransaction(
        { signature, ...latestBlockhash },
        'confirmed'
      );

      console.log(signature);
      // notify({ type: 'success', message: 'Transaction successful!', txid: signature });
    } catch (error: any) {
      // notify({ type: 'error', message: `Transaction failed!`, description: error?.message, txid: signature });
      console.log('error', `Transaction failed! ${error?.message}`, signature);
    }
  }, [publicKey, connection, sendTransaction]);

  return (
    <Button
      className="mb-2 rounded-lg bg-purple-700 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
      style={{ width: '150px', height: '30px' }}
      onClick={onClick}
      disabled={!publicKey}
    >
      <div className="hidden group-disabled:block ">Wallet not connected</div>
      <span className="block group-disabled:hidden">Send Transaction</span>
    </Button>
  );
};
