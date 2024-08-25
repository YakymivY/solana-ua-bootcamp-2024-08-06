import 'dotenv/config';
import { getExplorerLink } from '@solana-developers/helpers';
import { Connection, Keypair, clusterApiUrl, PublicKey, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { transfer, getOrCreateAssociatedTokenAccount, createTransferInstruction } from '@solana/spl-token';

let privateKey = process.env['SECRET_KEY'];
if (privateKey == undefined) {
    console.log("Add secret key to .env!");
    process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const user = Keypair.fromSecretKey(asArray);

let privateKey2 = process.env['SECRET_KEY2'];
if (privateKey2 == undefined) {
    console.log("Add secret key 2 to .env!");
    process.exit(1);
}
const asArray2 = Uint8Array.from(JSON.parse(privateKey2));
const user2 = Keypair.fromSecretKey(asArray2);

const connection = new Connection(clusterApiUrl("devnet"));
console.log("Connected to devnet");
console.log(`The public key is ${user.publicKey.toBase58()}`);
console.log(`The public key 2 is ${user2.publicKey.toBase58()}`);

const mintAccount = new PublicKey("6mZujSEv31dy9SStNjNbW5zJmA1iSmWJYWMx26e4bGLi");

const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user, 
    mintAccount,
    user.publicKey
);

const toTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user2, 
    mintAccount,
    user2.publicKey
);

let transferInstruction = await createTransferInstruction(
    fromTokenAccount.address,
    toTokenAccount.address,
    user.publicKey,
    500
);
const transaction = new Transaction().add(transferInstruction);
transaction.feePayer = user2.publicKey;

const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
transaction.recentBlockhash = blockhash;

transaction.partialSign(user);

const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [user, user2]
);



// let signature = await transfer(
//     connection,
//     user2,
//     fromTokenAccount.address,
//     toTokenAccount.address,
//     user.publicKey,
//     500
// );