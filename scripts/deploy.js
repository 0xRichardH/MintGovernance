const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const transactionCount = await owner.getTransactionCount();

  // gets the address of the token before it is deployed
  const futureAddress = ethers.utils.getContractAddress({
    from: owner.address,
    nonce: transactionCount + 1
  });

  const MyGovernor = await ethers.getContractFactory("MyGovernor");
  const governor = await MyGovernor.deploy(futureAddress);

  const MyToken = await ethers.getContractFactory("MyToken");
  const token = await MyToken.deploy(governor.address);

  console.log(
    `Governor deployed to ${governor.address}`,
    `Token deployed to ${token.address}`
  );
}

// Governor deployed to 0x7F244f7b047366B927a3ad6FFa0D5a7B055ee0b7 Token deployed to 0x6B49461f92FA9d9F70b36De2B4ec635971B86607
// Governor deployed to 0x6f6400C3A23808323A3386464cB7376f95F8E1b3 Token deployed to 0xe139FdA7BF2b590226a1F35bd41C8FDf6Df56904

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
