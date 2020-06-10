import { Cipher } from 'minimal-cipher';

import { keyResolver, unlockedDIDs } from '../../fixtures';

const { X25519KeyPair } = require('x25519-key-pair');

const cipher = new Cipher();

const keyAgreementKey = new X25519KeyPair(
  unlockedDIDs[
    'did:key:z6MktGVfipjBkipFvdE3qGBPQe9heMSuWpgdNVStAfjUsmXV'
  ].keyAgreement[0]
);

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
      keyAgreementKey,
    });
    expect(decryptedObject.key).toBe(obj.key);
  });

  it('arrays', async () => {
    const contents = [{ key: 'v0' }, { key: 'v1' }, { key: 'v2' }];
    let encryptedContents = [];
    for (let i = 0; i < contents.length; i++) {
      // be carefult because encryptObject mutates arguments...
      const jwe = await cipher.encryptObject({
        obj: { ...contents[i] },
        recipients: [...recipients],
        keyResolver,
      });
      encryptedContents.push({ jwe });
    }
    expect(encryptedContents.length).toBe(contents.length);
    let decryptedContent = [];
    for (let i = 0; i < encryptedContents.length; i++) {
      const content = await cipher.decryptObject({
        jwe: encryptedContents[i].jwe,
        keyAgreementKey,
      });
      decryptedContent.push(content);
    }
    expect(decryptedContent.length).toBe(3);
  });
});
