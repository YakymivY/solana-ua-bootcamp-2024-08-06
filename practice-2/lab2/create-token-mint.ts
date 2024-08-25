import 'dotenv/config';
import { getExplorerLink } from '@solana-developers/helpers';
import { Connection, Keypair, clusterApiUrl } from '@solana/web3.js';
import { createMint } from '@solana/spl-token';

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

const tokenMint = await createMint(
    connection,
    sender, 
    sender.publicKey,
    null,
    2
);

const link = getExplorerLink("address", tokenMint.toString(), "devnet");
console.log("Token mint", link);