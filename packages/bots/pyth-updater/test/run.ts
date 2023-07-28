import { JsonRpcProvider } from '@ethersproject/providers';

import { chainIdToConfig } from '../src/config';
import { Updater } from '../src/services';
import { setUpSdk } from '../src/utils';
import { Wallet } from 'ethers';
import config from '../src/config/service';

(async function () {
  const provider = new JsonRpcProvider(config.rpcUrl);
  const signer = new Wallet(config.adminPrivateKey, provider);

  const sdk = setUpSdk(config.chainId, signer);
  const assetConfig = chainIdToConfig[config.chainId];
  const updater = await new Updater(sdk).init(assetConfig);

  sdk.logger.info(`Starting update loop bot on chain: ${config.chainId}`);
  sdk.logger.info(`Config for bot: ${JSON.stringify(config)}`);
  await updater.updateFeeds();
})();
