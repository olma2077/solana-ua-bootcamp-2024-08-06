import { Keypair } from "@solana/web3.js";

let i = 0
let targetPrefix = "OLMA"
let keypair
let pubKey

console.time(`Time to get ${targetPrefix} at the beginning of PK`)

do {
    i++
    keypair = Keypair.generate();
    pubKey = keypair.publicKey.toBase58();
} while (!pubKey.startsWith(targetPrefix))

console.log(`Public key: ${keypair.publicKey.toBase58()}`)
console.log(`Iterations to get ${targetPrefix} at the beginning of PK: ${i}`)
console.timeEnd(`Time to get ${targetPrefix} at the beginning of PK`)
