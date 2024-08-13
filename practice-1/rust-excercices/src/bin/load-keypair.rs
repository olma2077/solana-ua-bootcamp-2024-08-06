#[macro_use]
extern crate dotenv_codegen;

use solana_sdk::signer::keypair::Keypair;

fn main() {
    let sk_bytes = parse_byte_array(dotenv!("SECRET_KEY"));
    let keypair = Keypair::from_bytes(&sk_bytes).expect("REASON");
    println!("Public key: {}", keypair.to_base58_string());
}

fn parse_byte_array(input: &str) -> Vec<u8> {
    let trimmed = input.trim_matches(|c| c == '[' || c == ']');

    let int_vec: Vec<u8> = trimmed
        .split(", ")
        .map(|s| s.parse::<u8>().expect("Failed to parse integer"))
        .collect();

    return int_vec;
}
