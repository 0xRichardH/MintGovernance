const { ethers } = require("hardhat");

// const PROPOSE_ID = "64696698724475519490655984237663607026960182216283398772733714099376579125434"
const PROPOSE_ID = "81783635953759329162793226880402758015881033060590175943806753753500899524353"
const GOVERNOR_ADDRESS = "0x6f6400C3A23808323A3386464cB7376f95F8E1b3"

async function main() {
  const governor = await ethers.getContractAt("MyGovernor", GOVERNOR_ADDRESS)
  const tx = await governor.castVote(PROPOSE_ID, 1)
  const receipt = await tx.wait()
  console.log(receipt)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
})
