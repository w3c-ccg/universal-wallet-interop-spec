import { Cipher } from 'minimal-cipher';

import { keyResolver, unlockedDIDs } from '../fixtures';

const { X25519KeyPair } = require('x25519-key-pair');

const cipher = new Cipher();

const keyAgreementKey =
  unlockedDIDs['did:key:z6MktGVfipjBkipFvdE3qGBPQe9heMSuWpgdNVStAfjUsmXV']
    .keyAgreement[0];

const recipient = {
  header: {
    kid: keyAgreementKey.id,
    alg: 'ECDH-ES+A256KW',
  },
};

const recipients = [recipient];

describe('minimal-cipher', () => {
  it('encrypt and decrypt object', async () => {
    const obj = { key: 'value' };
    const jwe = await cipher.encryptObject({ obj, recipients, keyResolver });
    expect(jwe.protected).toBeDefined();
    const decryptedObject: any = await cipher.decryptObject({
      jwe,
      keyAgreementKey: new X25519KeyPair(keyAgreementKey),
    });
    expect(decryptedObject.key).toBe(obj.key);
  });
});
