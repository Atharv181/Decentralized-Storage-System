require("@nomicfoundation/hardhat-toolbox");
// require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.6"
      }, 
    ]
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url:process.env.API_KEY,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    }, 
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};
