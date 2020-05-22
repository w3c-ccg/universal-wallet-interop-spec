import crypto from 'crypto';
import { Cipher } from 'minimal-cipher';

import documentLoader from './documentLoader';

const vcjs = require('vc-js');
const jsigs = require('jsonld-signatures');
const { Ed25519Signature2018 } = jsigs.suites;
// const {
//   // AssertionMethod,
//   AuthenticationProofPurpose,
// } = jsigs.purposes;
const { Ed25519KeyPair } = require('crypto-ld');
const { keyToDidDoc } = require('did-method-key').driver();
const { X25519KeyPair } = require('x25519-key-pair');

export const passwordToKey = (
  password: string,
  salt: string = 'salt',
  iterations: number = 100000,
  keyLength: number = 32,
  digest: string = 'sha512'
): Promise<Uint8Array> => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      salt,
      iterations,
      keyLength,
      digest,
      (err, derivedKey) => {
        if (err) {
          return reject(err);
        }
        return resolve(new Uint8Array(derivedKey));
      }
    );
  });
};

export const unlockDidKey = async (seed: Uint8Array): Promise<any> => {
  const ed25519Key = await Ed25519KeyPair.generate({
    seed,
  });
  const didDocument = keyToDidDoc(ed25519Key);
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
  return {
    id: content.id,
    jwe,
  };
};

export const unlockContent = async ({
  content,
  cipher,
  keyAgreementKey,
}: any) => {
  const decryptedObject: any = await cipher.decryptObject({
    jwe: content.jwe,
    keyAgreementKey: new X25519KeyPair(keyAgreementKey),
  });
  return decryptedObject;
};

export const lockContents = async (
  password: string,
  contents: any[]
): Promise<any[]> => {
  const derivedKey = await passwordToKey(password);
  const unlockedDidKey = await unlockDidKey(derivedKey);
  const lockedDidKey = lockDidKey(unlockedDidKey);
  const keyAgreementKey = lockedDidKey.keyAgreement[0];
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
    contents.map(content => {
      return lockContent({
        content,
        cipher,
        recipients,
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
  const cipher = new Cipher();
  return Promise.all(
    contents.map(content => {
      return unlockContent({
        content,
        cipher,
        keyAgreementKey,
      });
    })
  );
};

export const issue = async ({ credential, options }: any) => {
  const suite = new Ed25519Signature2018({
    key: new Ed25519KeyPair(options.verificationMethod),
  });
  const signedVC = await vcjs.issue({
    credential: {
      ...credential,
      issuer: options.verificationMethod.id.split('#')[0],
      issuanceDate: credential.issuanceDate || options.created,
    },
    suite,
    documentLoader,
  });
  return signedVC;
};

export const verifyCredential = ({ credential }: any) => {
  const suite = new Ed25519Signature2018();
  return vcjs.verifyCredential({
    credential,
    suite,
    documentLoader,
  });
};

export const verifyPresentation = ({ presentation, options }: any) => {
  const suite = new Ed25519Signature2018();
  return vcjs.verify({
    presentation,
    ...options,
    suite,
    documentLoader,
  });
};

export const createVerifiablePresentation = ({
  verifiableCredential,
  options,
}: any) => {
  const presentation = {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiablePresentation'],
    holder: options.holder,
    verifiableCredential,
  };
  const suite = new Ed25519Signature2018({
    key: new Ed25519KeyPair(options.verificationMethod),
  });
  return vcjs.signPresentation({
    presentation,
    suite,
    challenge: options.challenge,
    domain: options.domain,
  });
};
