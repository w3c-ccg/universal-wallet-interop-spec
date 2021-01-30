import { Cipher } from 'minimal-cipher';

import crypto from 'isomorphic-webcrypto';
import { X25519KeyPair } from '@transmute/did-key-x25519';
import { Ed25519KeyPair, driver } from '@transmute/did-key-ed25519';

export const unlockDidKey = async (seed: Uint8Array): Promise<any> => {
  const ed25519Key = await Ed25519KeyPair.generate({
    secureRandom: () => {
      return seed;
    },
  });
  const result = await driver.resolve(ed25519Key.controller);
  const unlockedDIDDocument = {
    ...result.didDocument,
  };

  const x25519Key = ed25519Key.toX25519KeyPair(true);

  unlockedDIDDocument.verificationMethod[0].privateKeyBase58 = ed25519Key.toKeyPair(
    true
  ).privateKeyBase58;
  unlockedDIDDocument.verificationMethod[1].privateKeyBase58 = x25519Key.toKeyPair(
    true
  ).privateKeyBase58;
  return unlockedDIDDocument;
};

export const lockDidKey = (unlockedDIDDocument: any): any => {
  delete unlockedDIDDocument.verificationMethod[0].privateKeyBase58;
  delete unlockedDIDDocument.verificationMethod[1].privateKeyBase58;
  const didDocument = { ...unlockedDIDDocument };
  return didDocument;
};

export const getKeyResolver = (didDocument: any) => {
  let keyAgreementKey: any = didDocument.verificationMethod[1];
  const keyResolver = ({ id }: any) => {
    if (keyAgreementKey.id === id) {
      return keyAgreementKey;
    }
    throw new Error(`Key ${id} not found in ${didDocument.id}`);
  };
  return keyResolver;
};

export const lockContent = async ({
  content,
  cipher,
  recipients,
  keyResolver,
}: any) => {
  const jwe = await cipher.encryptObject({
    obj: content,
    recipients,
    keyResolver,
  });
  return jwe;
};

export const unlockContent = async ({
  content,
  cipher,
  keyAgreementKey,
}: any) => {
  return cipher.decryptObject({
    jwe: content,
    keyAgreementKey: new X25519KeyPair(keyAgreementKey),
  });
};

export const lockContents = async (
  password: string,
  contents: any[]
): Promise<any[]> => {
  const derivedKey = await passwordToKey(password);
  const unlockedDidKey = await unlockDidKey(derivedKey);
  const lockedDidKey = lockDidKey(unlockedDidKey);
  const keyAgreementKey = lockedDidKey.verificationMethod[1];
  if (keyAgreementKey.id.indexOf('#') === 0) {
    keyAgreementKey.id = keyAgreementKey.controller + keyAgreementKey.id;
  }
  const recipient = {
    header: {
      kid: keyAgreementKey.id,
      alg: 'ECDH-ES+A256KW',
    },
  };
  const recipients = [recipient];
  const keyResolver = getKeyResolver(lockedDidKey);
  const cipher = new Cipher();
  return Promise.all(
    contents.map((content) => {
      return lockContent({
        content: { ...content },
        cipher,
        recipients: [...recipients],
        keyResolver,
      });
    })
  );
};

export const unlockContents = async (
  password: string,
  contents: any[]
): Promise<any[]> => {
  const derivedKey = await passwordToKey(password);
  const unlockedDidKey = await unlockDidKey(derivedKey);
  const keyAgreementKey = unlockedDidKey.verificationMethod[1];
  if (keyAgreementKey.id.indexOf('#') === 0) {
    keyAgreementKey.id = keyAgreementKey.controller + keyAgreementKey.id;
  }
  const cipher = new Cipher();
  let decryptedContents = [];
  for (let i = 0; i < contents.length; i++) {
    const content = contents[i];
    const decryptedContent = await unlockContent({
      content,
      cipher,
      keyAgreementKey,
    });
    decryptedContents.push(decryptedContent);
  }
  return decryptedContents;
};
