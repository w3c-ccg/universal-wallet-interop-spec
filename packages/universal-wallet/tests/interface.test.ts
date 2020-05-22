import { UniversalWallet2020 } from '../src';
import {
  walletContents,
  encryptedWallet,
  credential,
  verifiableCredential,
  verifiablePresentation,
} from '../fixtures';

jest.setTimeout(10 * 1000);

describe('Interface', () => {
  it('contructor', () => {
    let wallet = new UniversalWallet2020();
    expect(wallet).toBeDefined();
  });

  it('add', () => {
    let wallet = new UniversalWallet2020();
    let content = wallet.add(walletContents.key0);
    expect(wallet.contents[0]).toEqual(content);
  });

  it('remove', () => {
    let wallet = new UniversalWallet2020();
    let content = wallet.add(walletContents.key0);
    expect(wallet.contents[0]).toEqual(content);
    let removed = wallet.remove(content.id);
    expect(removed).toEqual(content);
    expect(wallet.contents.length).toBe(0);
  });

  it('lock', async () => {
    let wallet = new UniversalWallet2020();
    const content = walletContents.key0;
    wallet.add(content);
    const password = 'correct horse battery staple';
    await wallet.lock(password);
    expect(wallet.contents[0].id).toBe(content.id);
    expect(wallet.contents[0].jwe).toBeDefined();
    expect(wallet.status).toBe('LOCKED');
  });

  it('unlock', async () => {
    let wallet = new UniversalWallet2020();
    const content = walletContents.key0;
    wallet.add(content);
    const password = 'correct horse battery staple';
    await wallet.lock(password);
    expect(wallet.contents[0].id).toBe(content.id);
    expect(wallet.contents[0].jwe).toBeDefined();
    expect(wallet.status).toBe('LOCKED');
    await wallet.unlock(password);
    expect(wallet.status).toBe('UNLOCKED');
    expect(wallet.contents[0]).toEqual(content);
  });

  it('export', async () => {
    let wallet = new UniversalWallet2020();
    const content = walletContents.key0;
    wallet.add(content);
    const password = 'correct horse battery staple';
    await wallet.lock(password);
    const exported = wallet.export();
    const parsed = JSON.parse(exported);
    expect(parsed.issuer).toBe('did:example:123');
  });

  it('import', async () => {
    let wallet = new UniversalWallet2020();
    wallet.import(encryptedWallet);
    const password = 'correct horse battery staple';
    await wallet.unlock(password);
    expect(wallet.status).toBe('UNLOCKED');
    expect(wallet.contents[0].id).toEqual(
      'urn:uuid:e8fc7810-9524-11ea-bb37-0242ac130002'
    );
    expect(wallet.contents[0].type).toEqual('Ed25519VerificationKey2018');
  });

  it('query', async () => {
    let wallet = new UniversalWallet2020();
    wallet.import(encryptedWallet);
    const password = 'correct horse battery staple';
    await wallet.unlock(password);
    // count unique correlations
    const map = (content: any) => {
      return content.correlation;
    };
    const reduce = (initialValue: any, item: any) => {
      item.forEach((correlation: any) => {
        if (!initialValue[correlation]) {
          initialValue[correlation] = 1;
        } else {
          initialValue[correlation]++;
        }
      });
      return initialValue;
    };
    const initialValue = {};
    const results = wallet.query(map, reduce, initialValue);
    expect(results['4058a72a-9523-11ea-bb37-0242ac130002']).toBe(1);
  });

  it.skip('signRaw', async () => {});
  it.skip('verifyRaw', async () => {});

  it('issue', async () => {
    let wallet = new UniversalWallet2020();
    wallet.import(encryptedWallet);
    const password = 'correct horse battery staple';
    await wallet.unlock(password);
    const options = {
      verificationMethod:
        'did:key:z6MkjjCpsoQrwnEmqHzLdxWowXk5gjbwor4urC1RPDmGeV8r#z6MkjjCpsoQrwnEmqHzLdxWowXk5gjbwor4urC1RPDmGeV8r',
      proofPurpose: 'assertionMethod',
      created: '2020-04-02T18:48:36Z',
    };
    const verifiableCredential = await wallet.issue({
      credential,
      options,
    });
    expect(verifiableCredential.issuer).toBe(
      'did:key:z6MkjjCpsoQrwnEmqHzLdxWowXk5gjbwor4urC1RPDmGeV8r'
    );
    expect(verifiableCredential.proof).toBeDefined();
  });

  it('prove', async () => {
    let wallet = new UniversalWallet2020();
    wallet.import(encryptedWallet);
    const password = 'correct horse battery staple';
    await wallet.unlock(password);
    const verifiablePresentation = await wallet.prove({
      verifiableCredential: [verifiableCredential],
      options: {
        domain: 'verifier.example.com',
        challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
        verificationMethod:
          'did:key:z6MkjjCpsoQrwnEmqHzLdxWowXk5gjbwor4urC1RPDmGeV8r#z6MkjjCpsoQrwnEmqHzLdxWowXk5gjbwor4urC1RPDmGeV8r',
      },
    });
    // console.log(JSON.stringify(verifiablePresentation));
    expect(verifiablePresentation.proof).toBeDefined();
  });

  describe('verify', () => {
    it('credential', async () => {
      let wallet = new UniversalWallet2020();
      const verification = await wallet.verify({
        credential: verifiableCredential,
      });
      expect(verification.verified).toBe(true);
    });
    it('presentation', async () => {
      let wallet = new UniversalWallet2020();
      const verification = await wallet.verify({
        presentation: verifiablePresentation,
        options: {
          challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
          domain: 'verifier.example.com',
        },
      });
      expect(verification.verified).toBe(true);
    });
  });
});
