import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    clusterApiUrl,
} from "@solana/web3.js"

const connection = new Connection(clusterApiUrl("devnet"))
console.log(`⚡️ Connected to devnet`)

const publicKey = new PublicKey("9tXcieThA2H7VVZ1jb9nnqrUkc26DiBXnBJGAgSoY6Uu");
const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
  `💰 The balance for the wallet at address ${publicKey} is: ${balanceInSOL}`
);
