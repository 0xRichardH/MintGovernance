const { ethers } = require("hardhat")

// delegate voting power to another address
async function main() {
  // const ADDRESS = "0xb646c6637263134dB079eA41B8EeE64A2C7ABd36"

  const [owner] = await ethers.getSigners()

  const TOEKN_CONTRACT_ADDRESS = "0xe139FdA7BF2b590226a1F35bd41C8FDf6Df56904"

  const token = await ethers.getContractAt("MyToken", TOEKN_CONTRACT_ADDRESS)

  const tx = await token.delegate(owner.address)

  const receipt = await tx.wait()

  console.log(receipt)
  // https://goerli.etherscan.io/tx/0xf0809d40b3246209091bff0318e9a3a5863bd356b0d76261566b638bd95c6c28
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
