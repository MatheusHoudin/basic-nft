import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";

const config: HardhatUserConfig = {
  solidity: {
    "version": "0.8.18",
    "settings": {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    }
  },
  gasReporter: {
    enabled: false
  
  }
};

export default config;
