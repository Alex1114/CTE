require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-ethers");
require('hardhat-deploy');
require("dotenv").config();


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
      compilers: [
          {
              version: "0.7.5"
          }
      ],
      overrides: {
          "contracts/guessTheSecretNumber.sol": {
              version: "0.4.21",
              settings: {}
          }
      }
  },
  spdxLicenseIdentifier: {
      overwrite: true,
      runOnCompile: true,
  },
  // gasReporter: {
  //     currency: 'USD',
  //     gasPrice: 1
  // },

  
  defaultNetwork: "hardhat",
  settings: {
      optimizer: {
          enabled: true,
          runs: 1
      }
  },
  mocha: {
      timeout: 1000000000000
  },

  networks: {
      hardhat: {
          forking: {
              // url: "https://mainnet.infura.io/v3/7b54fb6c4fb64d71a21c1ae19867674a",
              url: "https://e93ba240ecf94244a82f2f141091d14c.eth.rpc.rivet.cloud",
              // url: "https://eth-mainnet.alchemyapi.io/v2/fCB7S8vvlUFxHmnrJlzYGGp0aYf1NGkE",
              timeout: 1000000000000
          },
          blockGasLimit: 10000000000000,
          allowUnlimitedContractSize: true,
          timeout: 1000000000000,
          accounts: {
              accountsBalance: "9999000000000000000000000000000000",
              count: 20
          },
      },
    ropsten: {
      url: process.env.ALCHEMY_API_ROPSTEN_URL,
      accounts: [process.env.WALLET_PRIVATE_KEY]
  }
  }
};