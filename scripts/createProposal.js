const { ethers } = require("hardhat")
const { parseEther } = ethers.utils

const CONTRACT_ADDRESS = "0x7F244f7b047366B927a3ad6FFa0D5a7B055ee0b7"
const TOEKEN_CONTRACT_ADDRESS = "0x6B49461f92FA9d9F70b36De2B4ec635971B86607"

async function main() {
  const [owner] = await ethers.getSigners()
  const token = await ethers.getContractAt("MyToken", TOEKEN_CONTRACT_ADDRESS)

  const governor = await ethers.getContractAt("MyGovernor", CONTRACT_ADDRESS)
  const tx = await governor.propose(
    [TOEKEN_CONTRACT_ADDRESS],
    [0],
    [token.interface.encodeFunctionData("mint", [owner.address, parseEther("25000")])],
    "Give the owner more tokens!"
  )
  const receipt = await tx.wait()
  const event = receipt.events.find(x => x.event === "ProposalCreated")
  const { proposalId } = event.args
  console.log(proposalId)

  // BigNumber { value: "82066042071022041372248000934101588342984116760805873413958290974932416966119" }
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error)
  process.exit(1)
})

