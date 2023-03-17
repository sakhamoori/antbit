import * as splToken from '@solana/spl-token';
import { web3, Wallet } from '@project-serum/anchor';

const transfer = async (tokenMintAddress: string, wallet: Wallet, to: string, connection: web3.Connection, amount: number) {

  const mintPublicKey = new web3.PublicKey(tokenMintAddress);
  const { TOKEN_PROGRAM_ID } = splToken

  const fromTokenAccount = await splToken.getOrCreateAssociatedTokenAccount(
    connection,
    wallet.payer,
    mintPublicKey,
    wallet.publicKey
  );

  const destPublicKey = new web3.PublicKey(to);

  // Get the derived address of the destination wallet which will hold the custom token
  const associatedDestinationTokenAddr = await splToken.getOrCreateAssociatedTokenAccount(
    connection,
    wallet.payer,
    mintPublicKey,
    destPublicKey
  );
  

  const receiverAccount = await connection.getAccountInfo(associatedDestinationTokenAddr.address);
        
  const instructions: web3.TransactionInstruction[] = [];  

  
  instructions.push(
    splToken.createTransferInstruction(
      fromTokenAccount.address,
      associatedDestinationTokenAddr.address,
      wallet.publicKey,
      amount,
      [],
      TOKEN_PROGRAM_ID
    )
  );

  const transaction = new web3.Transaction().add(...instructions);
  transaction.feePayer = wallet.publicKey;
  transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
  
  const transactionSignature = await connection.sendRawTransaction(
    transaction.serialize(),
    { skipPreflight: true }
  );

  await connection.confirmTransaction(transactionSignature);
}