import "dotenv/config";
import { getExplorerLink } from "@solana-developers/helpers";
import {
  Connection,
  Keypair,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

// Import keypair
let privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
  console.log("Add SECRET_KEY to .env!");
  process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

console.log(
  `🔑 Our pubic key is: ${sender.publicKey.toBase58()}`
);

// Create token account
const tokenMintAccount = new PublicKey(
    "7a11MZMn7edNin5Vt6jwVVZpqT5tAVr4hNVZce3cCk3F"
);
const recipient = new PublicKey(
    "6LEzAqFGyAx95LUWX7bLd5q74Rsnbps9Hy6aNL3LMDZw"
);

  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMintAccount,
    recipient
  );

  console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

  const link = getExplorerLink(
    "address",
    tokenAccount.address.toBase58(),
    "devnet"
  );

  console.log(`✅ Created token account: ${link}`);
