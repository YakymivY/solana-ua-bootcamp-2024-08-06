import 'dotenv/config';
import { getExplorerLink } from '@solana-developers/helpers';
import { Connection, Keypair, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';

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

const tokenMintAccount = new PublicKey("6mZujSEv31dy9SStNjNbW5zJmA1iSmWJYWMx26e4bGLi");
const recipient = new PublicKey("Akj7bGcxuoBPQHbeR8LnSv3NYudCPCnjxnh2k3ZQskaT");

const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection, 
    sender, 
    tokenMintAccount, 
    recipient
);
console.log("Token account:", tokenAccount.address.toBase58());

const link = getExplorerLink("address", tokenAccount.address.toBase58(), "devnet");
console.log("Created token account:", link);