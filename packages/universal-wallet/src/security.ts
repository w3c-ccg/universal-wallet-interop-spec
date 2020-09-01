import { Cipher } from 'minimal-cipher';

import crypto from 'isomorphic-webcrypto';
import { X25519KeyPair } from '@transmute/did-key-x25519';
import { Ed25519KeyPair, driver } from '@transmute/did-key-ed25519';

export const seedToId = async (seed: Uint8Array) => {
  const buffer = await crypto.subtle.digest('SHA-256', seed);
  return `urn:digest:${Buffer.from(new Int8Array(buffer)).toString('hex')}`;
};

export const passwordToKey = async (
  password: string,
  salt: string = 'salt',
  iterations: number = 100000,
  digest: string = 'SHA-256'
): Promise<Uint8Array> => {
  var saltBuffer = Buffer.from(salt);
  var passphraseKey = Buffer.from(password);
  return crypto.subtle
    .importKey('raw', passphraseKey, { name: 'PBKDF2' }, false, [
      'deriveBits',
      'deriveKey',
    ])
    .then(function (key: any) {
      return crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: saltBuffer,
          iterations: iterations,
          hash: digest,
        },
        key,
        // Note: we don't actually need a cipher suite,
        // but the api requires that it must be specified.
        // For AES the length required to be 128 or 256 bits (not bytes)
        { name: 'AES-CBC', length: 256 },
        // Whether or not the key is extractable (less secure) or not (more secure)
        // when false, the key can only be passed as a web crypto object, not inspected
        true,
        // this web crypto object will only be allowed for these functions
        ['encrypt', 'decrypt']
      );
    })
    .then((webKey: any) => {
      return crypto.subtle.exportKey('raw', webKey);
    })
    .then((buffer: any) => {
      return new Uint8Array(buffer);
    });
};

export const unlockDidKey = async (seed: Uint8Array): Promise<any> => {
  const ed25519Key = await Ed25519KeyPair.generate({
    seed,
  });
  const didDocument: any = driver.keyToDidDoc(ed25519Key);
  const unlockedDIDDocument = {
    ...didDocument,
  };
  const x25519Key = X25519KeyPair.fromEdKeyPair(ed25519Key);
  unlockedDIDDocument.publicKey[0].privateKeyBase58 =
    ed25519Key.privateKeyBase58;
  unlockedDIDDocument.keyAgreement[0].privateKeyBase58 =
    x25519Key.privateKeyBase58;
  return didDocument;
};

export const lockDidKey = (unlockedDIDDocument: any): any => {
  delete unlockedDIDDocument.publicKey[0].privateKeyBase58;
  delete unlockedDIDDocument.keyAgreement[0].privateKeyBase58;
  const didDocument = { ...unlockedDIDDocument };
  return didDocument;
};

export const getKeyResolver = (didDocument: any) => {
  let keyAgreementKey: any = didDocument.keyAgreement[0];
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
  const keyAgreementKey = lockedDidKey.keyAgreement[0];
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
  const keyAgreementKey = unlockedDidKey.keyAgreement[0];
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
