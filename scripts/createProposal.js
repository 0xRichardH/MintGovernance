const { ethers } = require("hardhat")
const { parseEther } = ethers.utils

const CONTRACT_ADDRESS = "0x6f6400C3A23808323A3386464cB7376f95F8E1b3"
const TOEKEN_CONTRACT_ADDRESS = "0xe139FdA7BF2b590226a1F35bd41C8FDf6Df56904"

async function main() {
  const [owner] = await ethers.getSigners()
  const token = await ethers.getContractAt("MyToken", TOEKEN_CONTRACT_ADDRESS)

  const governor = await ethers.getContractAt("MyGovernor", CONTRACT_ADDRESS)
  const tx = await governor.propose(
    [TOEKEN_CONTRACT_ADDRESS],
    [0],
    [token.interface.encodeFunctionData("mint", [owner.address, parseEther("1000")])],
    "Give the owner more tokens!"
  )
  const receipt = await tx.wait()
  const event = receipt.events.find(x => x.event === "ProposalCreated")
  const { proposalId } = event.args
  console.log(proposalId)

  // BigNumber { value: "82066042071022041372248000934101588342984116760805873413958290974932416966119" }
  // BigNumber { value: "64696698724475519490655984237663607026960182216283398772733714099376579125434" }
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error)
  process.exit(1)
})

