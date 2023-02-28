const { ethers } = require("hardhat")

// delegate voting power to another address
async function main() {
  const ADDRESS = "0xb646c6637263134dB079eA41B8EeE64A2C7ABd36"
  const TOEKN_CONTRACT_ADDRESS = "0x6B49461f92FA9d9F70b36De2B4ec635971B86607"

  const token = await ethers.getContractAt("MyToken", TOEKN_CONTRACT_ADDRESS)

  const tx = await token.delegate(ADDRESS)

  const receipt = await tx.wait()

  console.log(receipt)
  // https://goerli.etherscan.io/tx/0xf0809d40b3246209091bff0318e9a3a5863bd356b0d76261566b638bd95c6c28
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
