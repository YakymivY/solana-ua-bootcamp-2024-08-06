import 'dotenv/config';
import { getExplorerLink } from '@solana-developers/helpers';
import { Connection, Keypair, clusterApiUrl, PublicKey, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { createCreateMetadataAccountV3Instruction } from '@metaplex-foundation/mpl-token-metadata';

let privateKey = process.env['SECRET_KEY'];
if (privateKey == undefined) {
    console.log("Add secret key to .env!");
    process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const user = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));
console.log("Connected to devnet");
console.log(`The public key is ${user.publicKey.toBase58()}`);

const TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
const tokenMintAccount = new PublicKey("6mZujSEv31dy9SStNjNbW5zJmA1iSmWJYWMx26e4bGLi");

const metadataData = {
    name: "Fear Of Missing Out",
    symbol: "FOMO",
    uri: "https://t.me/crypto_antifomo",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null
};

const [metadataPDA, _metadataBump] = PublicKey.findProgramAddressSync(
    [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        tokenMintAccount.toBuffer()
    ],
    TOKEN_METADATA_PROGRAM_ID
);

const transaction = new Transaction();
const createMetadataAccountInstruction = createCreateMetadataAccountV3Instruction(
    {
        metadata: metadataPDA,
        mint: tokenMintAccount,
        mintAuthority: user.publicKey,
        payer: user.publicKey,
        updateAuthority: user.publicKey
    },
    {
        createMetadataAccountArgsV3: {
            collectionDetails: null,
            data: metadataData,
            isMutable: true
        }
    }
);
transaction.add(createMetadataAccountInstruction);

await sendAndConfirmTransaction(connection, transaction, [user]);

const tokenMintLink = getExplorerLink("address", tokenMintAccount.toString(), "devnet");
console.log("Changed metadata link:", tokenMintLink);