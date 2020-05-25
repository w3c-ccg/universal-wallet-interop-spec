import { UniversalWallet2020 } from '../src';
import {
  password,
  walletContents,
  encryptedWallet,
  credential,
  verifiableCredential,
  verifiablePresentation,
  derivedContentsFromPassword,
} from '../fixtures';

jest.setTimeout(10 * 1000);

describe('Interface', () => {
  it('contructor', () => {
    let wallet = new UniversalWallet2020();
    expect(wallet).toBeDefined();
  });

  it('generate', async () => {
    const seed = await UniversalWallet2020.passwordToSeed(password);
    let wallet = await UniversalWallet2020.generate(seed);
    // console.log(JSON.stringify(wallet.contents, null, 2));
    expect(wallet.contents).toEqual(derivedContentsFromPassword);
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
    const seed = await UniversalWallet2020.passwordToSeed(password);
    let wallet = await UniversalWallet2020.generate(seed);
    expect(wallet.contents).toEqual(derivedContentsFromPassword);
    await wallet.lock(password);
    expect(wallet.contents.length).toBe(3);
    expect(wallet.status).toBe('LOCKED');
    // const exported = wallet.export();
    // console.log(exported);
  });

  it('unlock', async () => {
    let wallet = new UniversalWallet2020();
    wallet.import(encryptedWallet);
    await wallet.unlock(password);
    expect(wallet.status).toBe('UNLOCKED');
    expect(wallet.contents.length).toBe(3);
  });

  it('export', async () => {
    let wallet = new UniversalWallet2020();
    const content = walletContents.key0;
    wallet.add(content);
    await wallet.lock(password);
    const exported = wallet.export();
    const parsed = JSON.parse(exported);
    expect(parsed.issuer).toBe('did:example:123');
  });

  it('import', async () => {
    let wallet = new UniversalWallet2020();
    wallet.import(encryptedWallet);
    await wallet.unlock(password);
    expect(wallet.status).toBe('UNLOCKED');
  });

  it('query', async () => {
    let wallet = new UniversalWallet2020();
    wallet.import(encryptedWallet);
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
    expect(
      results[
        'urn:digest:e7e086cd30cd177c4de7c20c72a7b37cabffe13e5cf81fff96d770e45cd470fb'
      ]
    ).toBe(3);
  });

  it.skip('signRaw', async () => {});
  it.skip('verifyRaw', async () => {});

  it('issue', async () => {
    let wallet = new UniversalWallet2020();
    wallet.import(encryptedWallet);
    await wallet.unlock(password);
    const options = {
      verificationMethod:
        'did:key:z6MkqLwp6yd8SCU6bdaGj4JVHuMNNGouFZ6tVgWiAXUt1PZj#z6MkqLwp6yd8SCU6bdaGj4JVHuMNNGouFZ6tVgWiAXUt1PZj',
      proofPurpose: 'assertionMethod',
      created: '2020-04-02T18:48:36Z',
    };
    const verifiableCredential = await wallet.issue({
      credential,
      options,
    });
    expect(verifiableCredential.issuer).toBe(
      'did:key:z6MkqLwp6yd8SCU6bdaGj4JVHuMNNGouFZ6tVgWiAXUt1PZj'
    );
    expect(verifiableCredential.proof).toBeDefined();
  });

  it('prove', async () => {
    let wallet = new UniversalWallet2020();
    wallet.import(encryptedWallet);
    await wallet.unlock(password);
    const verifiablePresentation = await wallet.prove({
      verifiableCredential: [verifiableCredential],
      options: {
        domain: 'verifier.example.com',
        challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
        verificationMethod:
          'did:key:z6MkqLwp6yd8SCU6bdaGj4JVHuMNNGouFZ6tVgWiAXUt1PZj#z6MkqLwp6yd8SCU6bdaGj4JVHuMNNGouFZ6tVgWiAXUt1PZj',
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
