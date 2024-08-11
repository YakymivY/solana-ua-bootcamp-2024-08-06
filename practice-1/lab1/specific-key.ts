import * as dotenv from 'dotenv';
import { Keypair } from "@solana/web3.js";
dotenv.config();

function findSpecificPublicKey () {
    let newKeypair: Keypair = Keypair.generate();
    let counter: number = 1;
    while(newKeypair.publicKey.toBase58()[0] !== 'Y' || newKeypair.publicKey.toBase58()[1] !== 'Y') { //ініціали
        newKeypair = Keypair.generate();
        counter++;
    }
    console.log("Needed key is found:", newKeypair.publicKey.toBase58());
    console.log(counter, "steps used");
}

findSpecificPublicKey()