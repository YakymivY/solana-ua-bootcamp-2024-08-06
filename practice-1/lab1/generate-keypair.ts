import * as dotenv from 'dotenv';
import { Keypair } from "@solana/web3.js";
dotenv.config();

function generateKeypair(): void {
    const keypair = Keypair.generate();
    console.log("Public key:", keypair.publicKey.toBase58());
    console.log("Private key:", keypair.secretKey);
}