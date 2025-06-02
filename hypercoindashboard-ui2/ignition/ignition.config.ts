// ignition/ignition.config.ts
import { IgnitionConfig } from '@nomicfoundation/hardhat-ignition/config';

const config: IgnitionConfig = {
  defaultNetwork: 'rsk-testnet',
  networks: {
    'rsk-testnet': {
      chainId: 31,
      rpcUrl: 'https://public-node.testnet.rsk.co',
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};

export default config;
