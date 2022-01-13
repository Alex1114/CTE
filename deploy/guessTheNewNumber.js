const { ethers } = require("hardhat");

const Contract = artifacts.require("predictTheBlockHash");

module.exports = async ({
  getNamedAccounts,
  deployments,
  getChainId,
  getUnnamedAccounts,
}) => {
  const {deploy, all} = deployments;
  const accounts = await ethers.getSigners();
  const deployer = accounts[0];
  console.log("");
  console.log("Deployer: ", deployer.address);

  guessNumber = await deploy('predictTheBlockHash', {
    contract: "predictTheBlockHash",
    from: deployer.address,
    args: [
    ],
  });

  console.log("predictTheBlockHash address: ", guessNumber.address);
};

module.exports.tags = ['predictTheBlockHash'];