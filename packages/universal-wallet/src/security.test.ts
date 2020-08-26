import {
  passwordToKey,
  unlockDidKey,
  lockDidKey,
  generateDefaultContents,
} from './security';

const { derivedContents } = require('./__fixtures__');

describe('security', () => {
  it('seed from password', async () => {
    const password = 'correct horse battery staple';
    const derivedKey: any = await passwordToKey(password);
    expect(Buffer.from(derivedKey).toString('hex')).toBe(
      '7052adea8f9823817065456ecad5bf24dcd31a698f7bc9a0b5fc170849af4226'
    );
  });

  it('unlockDidKey', async () => {
    const seed = new Uint8Array(32);
    seed.fill(0x01);
    const didDocument = await unlockDidKey(seed);
    expect(didDocument.id).toBe(
      'did:key:z6Mkon3Necd6NkkyfoGoHxid2znGc59LU3K7mubaRcFbLfLX'
    );
    expect(didDocument.publicKey[0].privateKeyBase58).toBe(
      '2AXDGYSE4f2sz7tvMMzyHvUfcoJmxudvdhBcmiUSo6iuCXagjUCKEQF21awZnUGxmwD4m9vGXuC3qieHXJQHAcT'
    );
    expect(didDocument.keyAgreement[0].privateKeyBase58).toBe(
      '6z4SgYi85NDbxwYerZ7WsBd43kC1T4THDsoAousbiBQ9'
    );
  });

  it('lockDidKey', async () => {
    const seed = new Uint8Array(32);
    seed.fill(0x01);
    const didDocument = await unlockDidKey(seed);
    expect(didDocument.id).toBe(
      'did:key:z6Mkon3Necd6NkkyfoGoHxid2znGc59LU3K7mubaRcFbLfLX'
    );
    expect(didDocument.publicKey[0].privateKeyBase58).toBe(
      '2AXDGYSE4f2sz7tvMMzyHvUfcoJmxudvdhBcmiUSo6iuCXagjUCKEQF21awZnUGxmwD4m9vGXuC3qieHXJQHAcT'
    );
    expect(didDocument.keyAgreement[0].privateKeyBase58).toBe(
      '6z4SgYi85NDbxwYerZ7WsBd43kC1T4THDsoAousbiBQ9'
    );
    lockDidKey(didDocument);
    expect(didDocument.publicKey[0].privateKeyBase58).toBe(undefined);
    expect(didDocument.keyAgreement[0].privateKeyBase58).toBe(undefined);
  });

  it('generateDefaultContents', async () => {
    const seed = Buffer.from(
      '4d3d7da2f70f69952f967110f08a7215beceff4d3690ea62be5824c90c308087',
      'hex'
    );
    const contents = await generateDefaultContents(new Uint8Array(seed));
    expect(contents).toEqual(derivedContents);
  });
});
