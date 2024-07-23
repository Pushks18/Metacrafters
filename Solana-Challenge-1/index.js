// Import Solana web3 functionalities
const {
  Connection,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

// Check if public key was provided as a command line argument
const publicKeyString = process.argv[2];

// Validate the provided public key
const publicKey = new PublicKey(publicKeyString);

// Connect to the Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

console.log("Public Key: ", publicKey.toString());

// Get the wallet balance for the given public key
const getWalletBalance = async () => {
  try {
    // Get balance of the user provided wallet address
    const walletBalance = await connection.getBalance(publicKey);
    console.log(
      `Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`
    );
  } catch (err) {
    console.log(err);
  }
};

const airDropSol = async () => {
  try {
    // Request airdrop of 2 SOL to the wallet
    console.log("Airdropping some SOL to the wallet!");
    const fromAirDropSignature = await connection.requestAirdrop(
      publicKey,
      2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
    console.log(err);
  }
};

// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
  await getWalletBalance();
  await airDropSol();
  await getWalletBalance();
};

mainFunction();
