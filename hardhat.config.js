require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const { EHTERSCAN_KEY, GOERLI_URL, ACCOUNT_PRIVATE_KEY, DELEGATED_ACCOUNT_PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts: [ACCOUNT_PRIVATE_KEY],
    },
    goerli2: {
      url: GOERLI_URL,
      accounts: [ACCOUNT_PRIVATE_KEY],
    }
  },
  etherscan: {
    apiKey: EHTERSCAN_KEY
  }
};
