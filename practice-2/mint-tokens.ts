import "dotenv/config";
import {
    Connection, Keypair, PublicKey, clusterApiUrl
} from "@solana/web3.js";
import { mintTo } from "@solana/spl-token";
import { getExplorerLink } from "@solana-developers/helpers";

// Load keypair
let privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
  console.log("Add SECRET_KEY to .env!");
  process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

// Create mint transaction to an address
const tokenMintAccount = new PublicKey(
  "7a11MZMn7edNin5Vt6jwVVZpqT5tAVr4hNVZce3cCk3F"
);

const recipientAssociatedTokenAccount = new PublicKey(
    "2uNSiWXYH9fKRVJzDj1biDg8srgmJSBkVpEtLQZYVe7A"
  );

  const transactionSignature = await mintTo(
    connection,
    sender,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    sender,
    13 * MINOR_UNITS_PER_MAJOR_UNITS
  );

  const link = getExplorerLink("transaction", transactionSignature, "devnet");

  console.log(`✅ Success! Mint Token Transaction: ${link}`);
