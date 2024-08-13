import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    clusterApiUrl,
} from "@solana/web3.js"
import {
    airdropIfRequired,
  } from "@solana-developers/helpers";

const connection = new Connection(clusterApiUrl("devnet"))
console.log(`⚡️ Connected to devnet`)

const publicKey = new PublicKey("9tXcieThA2H7VVZ1jb9nnqrUkc26DiBXnBJGAgSoY6Uu");

await airdropIfRequired(
    connection,
    publicKey,
    1 * LAMPORTS_PER_SOL,
    0.5 * LAMPORTS_PER_SOL
);

console.log(
    `💰 SOL airdrop for the wallet at address ${publicKey} was requested`
);
