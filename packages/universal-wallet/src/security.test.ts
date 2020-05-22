import { passwordToKey, unlockDidKey, lockDidKey } from './security';

describe('security', () => {
  it('seed from password', async () => {
    const password = 'correct horse battery staple';
    const derivedKey: any = await passwordToKey(password);
    expect(derivedKey.toString('hex')).toBe(
      '8d31bd05e4c731541fee3f2fd069bdb249bb415d833cfad1a231a799da5857b5'
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
});
