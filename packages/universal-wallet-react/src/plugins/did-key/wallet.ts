import * as Factory from 'factory.ts';
import {
  DidKeyPlugin,
  pluginFactory,
  factoryDefaults,
} from '@transmute/universal-wallet-did-key-plugin';

import {
  walletFactory,
  Wallet,
  walletDefaults,
} from '@transmute/universal-wallet';

interface DidKeyWallet extends Wallet, DidKeyPlugin {}

const didKeyWalletFactory = Factory.Sync.makeFactory<DidKeyWallet>({
  ...walletDefaults,
  ...factoryDefaults,
})
  .combine(walletFactory)
  .combine(pluginFactory);

export const wallet = didKeyWalletFactory.build();
