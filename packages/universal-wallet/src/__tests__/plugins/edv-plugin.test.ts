import * as Factory from 'factory.ts';

import {
  EdvPlugin,
  pluginFactory,
  factoryDefaults,
} from '@transmute/universal-wallet-edv-plugin';

import * as fixtures from '@transmute/universal-wallet-test-vectors';

import { Wallet, walletFactory, walletDefaults } from '../../walletFactory';

it.skip('can build wallet with edv plugin', async () => {
  interface EdvWallet extends Wallet, EdvPlugin {}

  const edvWalletFactory = Factory.Sync.makeFactory<EdvWallet>({
    ...walletDefaults,
    ...factoryDefaults,
  })
    .combine(walletFactory)
    .combine(pluginFactory);

  const wallet = edvWalletFactory.build();

  const entropy = fixtures.content[0];
  const ed25519Key = fixtures.content[1];
  ed25519Key.controller = ed25519Key.id.split('#')[0];

  const x25519Key = fixtures.content[2];
  x25519Key.controller = x25519Key.id.split('#')[0];

  const vaultConfig = {
    vault_endpoint: 'https://localhost:8080/edvs',
    ed25519Key,
    x25519Key,
    hmacSecret: Buffer.from(entropy.value, 'hex'),
  };
  const client = await wallet.vaultClientFromDerivedContents(vaultConfig);
  expect(client).toBeDefined();
});
