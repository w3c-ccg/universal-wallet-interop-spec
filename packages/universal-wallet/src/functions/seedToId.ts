import crypto from 'isomorphic-webcrypto';

export const seedToId = async (seed: Uint8Array) => {
  const buffer = await crypto.subtle.digest('SHA-256', seed);
  return `urn:digest:${Buffer.from(new Int8Array(buffer)).toString('hex')}`;
};
