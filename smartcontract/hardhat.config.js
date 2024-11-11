require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.9" },
      { version: "0.8.24" },
      { version: "0.4.8" },
      { version: "0.4.24" },
      { version: "0.7.0" },
    ]
  }
};
