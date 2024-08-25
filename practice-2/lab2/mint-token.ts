import 'dotenv/config';
import { getExplorerLink } from '@solana-developers/helpers';
import { Connection, Keypair, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { mintTo } from '@solana/spl-token';

let privateKey = process.env['SECRET_KEY'];
if (privateKey == undefined) {
    console.log("Add secret key to .env!");
    process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));
console.log("Connected to devnet");
console.log(`The public key is ${sender.publicKey.toBase58()}`);

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);
const tokenMintAccount = new PublicKey("6mZujSEv31dy9SStNjNbW5zJmA1iSmWJYWMx26e4bGLi");
const recipientAssociatedTokenAccount = new PublicKey("9K7dzxHqkh7RzU2GDRwKKRC5JkwQqLMTNjWgeGDoHYU7");

const transactionSignature = await mintTo(
    connection,
    sender, 
    tokenMintAccount, 
    recipientAssociatedTokenAccount,
    sender,
    10 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link = getExplorerLink("transaction", transactionSignature, "devnet");
console.log("Success! Mint Token Transaction", link);