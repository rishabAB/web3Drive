const hre = require("hardhat");  // hre is hardhat runtime environment

async function main() {
    // hre.ethers: A library provided by Hardhat for interacting with Ethereum. It's based on ethers.js
  const Upload = await hre.ethers.getContractFactory("Upload"); // Retrieves the Contract Factory for the Upload smart contract
  const upload = await Upload.deploy();
  /* Calls the deploy method on the Contract Factory to deploy the Upload contract to the blockchain.
Returns an instance of the deployed contract, which is stored in the upload variable*/

/* Waits for the contract deployment to be mined and confirmed on the blockchain.
Ensures that the contract is fully deployed and ready for interaction*/

await upload.deployed();
  console.log("Library deployed to:", upload.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});