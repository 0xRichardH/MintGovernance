const { ethers } = require("hardhat")
const { keccak256, toUtf8Bytes, parseEther } = require("ethers/lib/utils")

const CONTRACT_ADDRESS = "0x6f6400C3A23808323A3386464cB7376f95F8E1b3"
const TOEKEN_CONTRACT_ADDRESS = "0xe139FdA7BF2b590226a1F35bd41C8FDf6Df56904"

async function main() {
  const [owner] = await ethers.getSigners()
  const governor = await ethers.getContractAt("MyGovernor", CONTRACT_ADDRESS)
  const token = await ethers.getContractAt("MyToken", TOEKEN_CONTRACT_ADDRESS)

  const tx = await governor.execute(
    [token.address],
    [0],
    [token.interface.encodeFunctionData("mint", [owner.address, parseEther("1000")])],
    keccak256(toUtf8Bytes("Give the owner more tokens!")),
  )

  const receipt = await tx.wait()
  console.log("Transaction receipt", receipt)
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error)
  process.exit(1)
})

