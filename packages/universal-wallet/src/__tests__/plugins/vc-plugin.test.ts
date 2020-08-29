import * as Factory from 'factory.ts';

import {
  VcPlugin,
  pluginFactory,
  factoryDefaults,
} from '@transmute/universal-wallet-vc-plugin';

import { Ed25519KeyPair } from '@transmute/did-key-ed25519';
import { Ed25519Signature2018 } from '@transmute/ed25519-signature-2018';

import * as fixtures from '@transmute/universal-wallet-test-vectors';

import { Wallet, walletFactory, walletDefaults } from '../../walletFactory';

const keypair = {
  ...fixtures.content[1],
  id: 'http://example.com/issuer/123#key-1',
};
const key = new Ed25519KeyPair(keypair);

const suite = new Ed25519Signature2018({
  key,
  date: '2020-03-10T04:24:12.164Z',
});

const credential = {
  ...fixtures.ldp_vc_template,
  issuer: 'http://example.com/issuer/123',
  issuanceDate: '2020-03-10T04:24:12.164Z',
};

it('can build wallet with vc plugin', async () => {
  interface VcWallet extends Wallet, VcPlugin {}

  const vcWalletFactory = Factory.Sync.makeFactory<VcWallet>({
    ...walletDefaults,
    ...factoryDefaults,
  })
    .combine(walletFactory)
    .combine(pluginFactory);

  const wallet = vcWalletFactory.build();
  const vc = await wallet.issue({
    credential,
    options: {
      suite,
      documentLoader: fixtures.documentLoader,
    },
  });
  expect(vc).toEqual(fixtures.ldp_vc);
});
