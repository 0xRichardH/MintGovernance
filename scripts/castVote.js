const { ethers } = require("hardhat");

const PROPOSE_ID = "82066042071022041372248000934101588342984116760805873413958290974932416966119"
const GOVERNOR_ADDRESS = "0x7F244f7b047366B927a3ad6FFa0D5a7B055ee0b7"

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
