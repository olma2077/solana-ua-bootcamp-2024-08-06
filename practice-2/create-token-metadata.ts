import "dotenv/config";
import {
  Connection,
  clusterApiUrl,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";
import { getExplorerLink } from "@solana-developers/helpers";
// Yes, createCreate! We're making an instruction for createMetadataV3...
import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

// Load keypair
let privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
  console.log("Add SECRET_KEY to .env!");
  process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const user = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

// Create metadata
// Metaplex fixed address
const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

const tokenMintAccount = new PublicKey(
  "7a11MZMn7edNin5Vt6jwVVZpqT5tAVr4hNVZce3cCk3F"
);

const metadataData = {
  name: "Solana UA Bootcamp OLMA 2",
  symbol: "OLMA-UAB-2",
  // Arweave / IPFS / Pinata etc link using metaplex standard for off-chain data
  uri: "https://raw.githubusercontent.com/olma2077/solana-ua-bootcamp-2024-08-06/main/practice-2/offchain-metadata.json",
  sellerFeeBasisPoints: 0,
  creators: null,
  collection: null,
  uses: null,
};

// PDA address
const [metadataPDA, _metadataBump] = PublicKey.findProgramAddressSync(
  [
    Buffer.from("metadata"),
    TOKEN_METADATA_PROGRAM_ID.toBuffer(),
    tokenMintAccount.toBuffer(),
  ],
  TOKEN_METADATA_PROGRAM_ID
);

// Create transaction
const transaction = new Transaction();
const createMetadataAccountInstruction =
  createCreateMetadataAccountV3Instruction(
    {
      metadata: metadataPDA,
      mint: tokenMintAccount,
      mintAuthority: user.publicKey,
      payer: user.publicKey,
      updateAuthority: user.publicKey,
    },
    {
      createMetadataAccountArgsV3: {
        collectionDetails: null,
        data: metadataData,
        isMutable: true,
      },
    }
  );
transaction.add(createMetadataAccountInstruction);

// Send transaction
await sendAndConfirmTransaction(connection, transaction, [user]);

const tokenMintLink = getExplorerLink(
  "address",
  tokenMintAccount.toString(),
  "devnet"
);
console.log(`✅ Look at the token mint again: ${tokenMintLink}!`);
