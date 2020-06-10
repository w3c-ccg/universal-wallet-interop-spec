import { VaultClient } from './VaultClient';

import {
  derivedContentsFromPassword,
  verifiableCredential,
  verifiableCredentialMeta,
} from '../../fixtures';

describe('client-client', () => {
  it('init', async () => {
    const entropy = derivedContentsFromPassword[0];
    const ed25519Key = derivedContentsFromPassword[1];
    ed25519Key.controller = ed25519Key.id.split('#')[0];

    const x25519Key = derivedContentsFromPassword[2];
    x25519Key.controller = x25519Key.id.split('#')[0];

    let client = await VaultClient.fromDerivedContents(
      'http://localhost:8080/edvs',
      ed25519Key,
      x25519Key,
      Buffer.from(entropy.value, 'hex')
    );

    const doc1 = {
      id: 'z1A6LudYMzfM1CGFrNXgjh2sN',
      // id: await EdvClient.generateId(),
      content: {
        schema: 'https://schema.org/UniversalWallet',
        data: verifiableCredential,
      },
    };
    const doc2 = {
      id: 'z1A3RWFrTkYJqSryRwuEm1zt6',
      // id: await EdvClient.generateId(),
      content: {
        schema: 'https://schema.org/UniversalWallet',
        data: verifiableCredentialMeta,
      },
    };
    await client.addWalletContent(doc1);
    await client.addWalletContent(doc2);
    const contents = await client.getWalletContents();
    console.log(contents);
  });
});
