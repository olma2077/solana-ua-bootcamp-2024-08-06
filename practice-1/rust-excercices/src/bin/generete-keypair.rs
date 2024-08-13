use solana_sdk::signer::keypair::Keypair;

fn main() {
    let keypair = Keypair::new();

    println!("The public key is: {}", keypair.to_base58_string());
    println!("The secret key is: {:?}", keypair.to_bytes());
    println!("✅ Finished!");
}