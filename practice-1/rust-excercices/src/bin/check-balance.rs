use solana_client::rpc_client::RpcClient;
use solana_sdk::pubkey::Pubkey;
use std::str::FromStr;

fn main() {
    let rpc_url = "https://api.devnet.solana.com";
    let client = RpcClient::new(rpc_url.to_string());

    let pubkey_str = "9tXcieThA2H7VVZ1jb9nnqrUkc26DiBXnBJGAgSoY6Uu";
    let pubkey = Pubkey::from_str(pubkey_str).expect("Invalid public key");

    let balance = client.get_balance(&pubkey).expect("Failed to get balance");

    println!("Wallet balance: {} lamports", balance);

    let sol_balance = balance as f64 / 1_000_000_000.0;
    println!("Wallet balance: {:.9} SOL", sol_balance);
}
