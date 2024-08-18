import "dotenv/config";
import {
  getExplorerLink,
} from "@solana-developers/helpers";
import {
  Keypair,
  clusterApiUrl,
  Connection,
} from "@solana/web3.js";
import {
    createMint
} from "@solana/spl-token";

// Load keypair
let privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
  console.log("Add SECRET_KEY to .env!");
  process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

console.log(`🔑 Our public key is: ${sender.publicKey.toBase58()}`);

// Create token mint address
const tokenMint = await createMint(
    connection,
    sender,
    sender.publicKey,
    null,
    2
  );

console.log(`Token Mint Address: ${tokenMint.toBase58()}`)

const link = getExplorerLink("address", tokenMint.toString(), "devnet");
console.log(`✅ Token Mint Link: ${link}`);