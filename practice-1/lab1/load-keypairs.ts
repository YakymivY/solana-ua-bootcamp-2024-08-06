import * as dotenv from 'dotenv';
import { Keypair } from "@solana/web3.js";
dotenv.config();

export function getKeys (): Keypair | null {
    const jsonString = process.env.SECRET_KEY;
    if (jsonString) {
        let secretKey = Uint8Array.from(JSON.parse(jsonString));
        const keypair = Keypair.fromSecretKey(secretKey);
        console.log('Public key:', keypair.publicKey.toBase58());
        return keypair;
    } else {
        console.log('Could not get key from .env!')
        return null;
    }
}

getKeys()