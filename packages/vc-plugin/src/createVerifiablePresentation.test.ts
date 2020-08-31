import * as fixtures from '@transmute/universal-wallet-test-vectors';

import { Ed25519KeyPair } from '@transmute/did-key-ed25519';
import { Ed25519Signature2018 } from '@transmute/ed25519-signature-2018';
import { plugin } from './index';

const keypair = {
  ...fixtures.content[1],
  id: 'http://example.com/issuer/123#key-1',
};
const key = new Ed25519KeyPair(keypair);

const suite = new Ed25519Signature2018({
  key,
  date: '2020-03-10T04:24:12.164Z',
});

it('should createVerifiablePresentation', async () => {
  const vp = await plugin.createVerifiablePresentation({
    verifiableCredential: [fixtures.ldp_vc],
    options: {
      challenge: 'nonce-123',
      domain: 'example.com',
      suite,
      documentLoader: fixtures.documentLoader,
    },
  });
  expect(vp).toEqual(fixtures.ldp_vp);
});
