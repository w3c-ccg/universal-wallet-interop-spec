import { passwordToKey, unlockDidKey, lockDidKey } from './security';

import * as fixtures from '@transmute/universal-wallet-test-vectors';

describe('security', () => {
  it('seed from password', async () => {
    const derivedKey: any = await passwordToKey(fixtures.password);
    expect(Buffer.from(derivedKey).toString('hex')).toBe(fixtures.seed);
  });

  it('unlockDidKey', async () => {
    const didDocument = await unlockDidKey(
      new Uint8Array(Buffer.from(fixtures.seed, 'hex'))
    );
    expect(didDocument.id).toBe(
      fixtures.issuers[
        'did:key:z6MkwJSaEMnE4u6LiqrZV1BJHSkc9x8S4mTm3ArNL1m19BZR'
      ].id
    );
    expect(didDocument.verificationMethod[0].privateKeyBase58).toBe(
      fixtures.content[1].privateKeyBase58
    );
    expect(didDocument.verificationMethod[1].privateKeyBase58).toBe(
      fixtures.content[2].privateKeyBase58
    );
  });

  it('lockDidKey', async () => {
    const didDocument = await unlockDidKey(
      new Uint8Array(Buffer.from(fixtures.seed, 'hex'))
    );
    lockDidKey(didDocument);
    expect(didDocument.verificationMethod[0].privateKeyBase58).toBe(undefined);
    expect(didDocument.verificationMethod[1].privateKeyBase58).toBe(undefined);
  });
});
