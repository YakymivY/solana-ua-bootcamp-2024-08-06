import 'dotenv/config';
import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { getKeys } from '../lab1/load-keypairs';

const connection = new Connection(clusterApiUrl("devnet"));
console.log("Connected to devnet");

const keypair = getKeys();
if (keypair) {
    const address = keypair?.publicKey.toBase58();
    const publicKey = new PublicKey(address);
    const balanceInLamports = await connection.getBalance(publicKey);

    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
    console.log("The balance for the wallet at address", address, "is:", balanceInSOL);
}