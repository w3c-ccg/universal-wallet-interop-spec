import * as Factory from 'factory.ts';

import * as DidKey from '@transmute/universal-wallet-did-key-plugin';
import * as Vc from '@transmute/universal-wallet-vc-plugin';

import { Ed25519KeyPair } from '@transmute/did-key-ed25519';
import { Ed25519Signature2018 } from '@transmute/ed25519-signature-2018';

import { Wallet, walletFactory, walletDefaults } from '../walletFactory';

import * as fixtures from '@transmute/universal-wallet-test-vectors';

interface DidKeyVcWallet extends Wallet, DidKey.DidKeyPlugin, Vc.VcPlugin {}

const didKeyWalletFactory = Factory.Sync.makeFactory<DidKeyVcWallet>({
  ...walletDefaults,
  ...DidKey.factoryDefaults,
  ...Vc.factoryDefaults,
})
  .combine(walletFactory)
  .combine(DidKey.pluginFactory)
  .combine(Vc.pluginFactory);

const wallet = didKeyWalletFactory.build();

const keypair = {
  ...fixtures.content[1],
};
const key = new Ed25519KeyPair(keypair);

const suite = new Ed25519Signature2018({
  key,
  date: '2020-03-10T04:24:12.164Z',
});

const documentLoader = (uri: string): Promise<any> => {
  // just in time, extend the document loader for the context of credentials
  // you are issuing.
  if (
    uri ===
    'https://w3c-ccg.github.io/universal-wallet-interop-spec/contexts/wallet-v1.json'
  ) {
    return Promise.resolve({
      contextUrl: null,
      documentUrl: uri,
      document: JSON.stringify(
        require('../../../../docs/contexts/wallet-v1.json')
      ),
    });
  }
  return fixtures.documentLoader(uri);
};

it('can build a wallet with did key and vc plugin', () => {
  // interfaces from wallet are included
  expect(wallet.export).toBeDefined();
  // interfaces from did key plugin are included
  expect(wallet.generateContentFromSeed).toBeDefined();
  // interfaces from vc plugin are included
  expect(wallet.issue).toBeDefined();
});

it('can use password as seed for default did key content', async () => {
  const seed = await wallet.passwordToKey(fixtures.password);
  expect(fixtures.seed).toBe(Buffer.from(seed).toString('hex'));
  const content = await wallet.generateContentFromSeed(seed);
  expect(content).toEqual(fixtures.content);
});

it('add / remove', () => {
  wallet.add(fixtures.ldp_vc);
  expect(wallet.contents[0]).toEqual(fixtures.ldp_vc);
  wallet.remove(fixtures.ldp_vc.id);
  expect(wallet.contents).toEqual([]);
});

it('export / issue', async () => {
  const walletToBeExported = didKeyWalletFactory.build();
  const seed = await walletToBeExported.passwordToKey(fixtures.password);
  const contents = await walletToBeExported.generateContentFromSeed(seed);
  contents.forEach((content) => {
    walletToBeExported.add(content);
  });
  expect(walletToBeExported.status).toBe('UNLOCKED');
  expect(walletToBeExported.contents).toEqual(contents);
  const encryptedWalletTemplate = await walletToBeExported.export(
    fixtures.password
  );
  const vc = await wallet.issue({
    credential: encryptedWalletTemplate,
    options: {
      suite,
      documentLoader,
    },
  });
  expect(vc.proof).toBeDefined();
});

it('verify / import', async () => {
  const walletForImport = didKeyWalletFactory.build();
  const verification = await walletForImport.verifyCredential({
    credential: fixtures.ldp_encrypted_wallet_vc,
    options: {
      // verification uses document loader to get key material
      suite: new Ed25519Signature2018({}),
      documentLoader,
    },
  });
  expect(verification.verified).toBe(true);
  await walletForImport.import(
    fixtures.ldp_encrypted_wallet_vc,
    fixtures.password
  );
  expect(walletForImport.contents).toEqual(fixtures.content);
});

it('lock / unlock', async () => {
  const walletForLock = didKeyWalletFactory.build();
  walletForLock.add(fixtures.ldp_vc);
  expect(walletForLock.status).toBe('UNLOCKED');
  expect(walletForLock.contents).toEqual([fixtures.ldp_vc]);
  await walletForLock.lock(fixtures.password);
  expect(walletForLock.status).toBe('LOCKED');
  expect(walletForLock.contents[0].ciphertext).toBeDefined();
});

// count items by generatedFrom
it.only('query', async () => {
  const walletForQuery = didKeyWalletFactory.build();
  const seed = await walletForQuery.passwordToKey(fixtures.password);
  const contents = await walletForQuery.generateContentFromSeed(seed);
  contents.forEach((content) => {
    walletForQuery.add(content);
  });
  const map = (content: any) => {
    return content.generatedFrom;
  };
  const reduce = (initialValue: any, item: any) => {
    if (item) {
      item.forEach((generatedFrom: any) => {
        if (!initialValue[generatedFrom]) {
          initialValue[generatedFrom] = 1;
        } else {
          initialValue[generatedFrom]++;
        }
      });
    }
    return initialValue;
  };
  const initialValue = {};
  const results = walletForQuery.query(map, reduce, initialValue);
  expect(results).toEqual({
    'urn:digest:9468ad3dcb7c87cd994b9013f980569af9c81823b1bfd1ffdb7c3fc72abb652a': 2,
  });
});
