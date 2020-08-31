import * as ed25519 from '@transmute/did-key-ed25519';
import * as x25519 from '@transmute/did-key-x25519';
import crypto from 'isomorphic-webcrypto';

export const seedToId = async (seed: Uint8Array) => {
  const buffer = await crypto.subtle.digest('SHA-256', seed);
  return `urn:digest:${Buffer.from(new Int8Array(buffer)).toString('hex')}`;
};

const generateContentFromSeed = async (seed: Uint8Array) => {
  const ed25519Key = await ed25519.Ed25519KeyPair.generate({
    seed,
  });
  const didDocument: any = ed25519.driver.keyToDidDoc(ed25519Key);
  const x25519Key = x25519.X25519KeyPair.fromEdKeyPair(ed25519Key);
  const signingKey = {
    ...didDocument.publicKey[0],
    privateKeyBase58: ed25519Key.privateKeyBase58,
  };
  const encryptionKey = {
    ...didDocument.keyAgreement[0],
    privateKeyBase58: x25519Key.privateKeyBase58,
  };

  const seedId = await seedToId(seed);

  const secret0 = {
    '@context': [
      'https://w3c-ccg.github.io/universal-wallet-interop-spec/contexts/wallet-v1.json',
    ],
    id: seedId,
    name: 'DID Key Secret',
    image: 'https://via.placeholder.com/150',
    description: 'Used to generate a DID with a signing and encryption key.',
    tags: ['inception'],
    type: 'Entropy',
    value: Buffer.from(seed).toString('hex'),
  };

  const key0 = {
    ...signingKey,
    id: signingKey.controller + signingKey.id,
    '@context': [
      'https://w3c-ccg.github.io/universal-wallet-interop-spec/contexts/wallet-v1.json',
    ],
    name: 'Signing Key',
    image: 'https://via.placeholder.com/150',
    description: 'Used to produce digital signatures.',
    tags: ['inception'],
    generatedFrom: [secret0.id],
  };

  const key1 = {
    ...encryptionKey,
    id: encryptionKey.controller + encryptionKey.id,
    '@context': [
      'https://w3c-ccg.github.io/universal-wallet-interop-spec/contexts/wallet-v1.json',
    ],
    name: 'Encryption Key',
    image: 'https://via.placeholder.com/150',
    description: 'Used to derive symmetric keys for encryption.',
    tags: ['inception'],
    generatedFrom: [secret0.id],
  };
  return [secret0, key0, key1];
};

export { generateContentFromSeed };
