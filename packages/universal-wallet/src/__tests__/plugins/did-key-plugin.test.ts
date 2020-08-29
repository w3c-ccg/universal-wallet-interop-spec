import * as Factory from 'factory.ts';

import {
  DidKeyPlugin,
  pluginFactory,
  factoryDefaults,
} from '@transmute/universal-wallet-did-key-plugin';

import * as fixtures from '@transmute/universal-wallet-test-vectors';

import { Wallet, walletFactory, walletDefaults } from '../../walletFactory';

it('can build wallet with did key plugin', async () => {
  interface DidKeyWallet extends Wallet, DidKeyPlugin {}

  const didKeyWalletFactory = Factory.Sync.makeFactory<DidKeyWallet>({
    ...walletDefaults,
    ...factoryDefaults,
  })
    .combine(walletFactory)
    .combine(pluginFactory);

  const wallet = didKeyWalletFactory.build();
  const content = await wallet.generateContentFromSeed(
    new Uint8Array(Buffer.from(fixtures.seed, 'hex'))
  );
  expect(content).toEqual(fixtures.content);
});
