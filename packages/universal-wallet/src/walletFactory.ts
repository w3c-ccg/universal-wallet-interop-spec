import * as Factory from 'factory.ts';

import { WalletStatus } from './types';

import {
  lockContents,
  unlockContents,
  passwordToKey,
  seedToId,
  unlockDidKey,
} from './security';

interface Wallet {
  status: WalletStatus;
  contents: any[];
  passwordToKey: (password: string) => Promise<Uint8Array>;
  seedToId: (seed: Uint8Array) => Promise<string>;
  add: (content: any) => Wallet;
  remove: (contentId: string) => Wallet;
  lock: (password: string) => Promise<Wallet>;
  unlock: (password: string) => Promise<Wallet>;
  export: (password: string) => Promise<any>;
  import: (encryptedWalletCredential: any, password: string) => Promise<Wallet>;
  query: (map: any, reduce: any, initialValue: any) => any;
}

const walletDefaults = {
  status: WalletStatus.Unlocked,
  contents: [],
  passwordToKey,
  seedToId,
  add: function(content: any): Wallet {
    (this as Wallet).contents.push(content);
    return this;
  },
  remove: function(contentId: string): any {
    let index = (this as Wallet).contents.findIndex((c: any) => {
      return c.id === contentId;
    });
    let content = (this as Wallet).contents[index];
    (this as Wallet).contents = (this as Wallet).contents.splice(index, index);
    return content;
  },
  lock: async function(password: string): Promise<Wallet> {
    (this as Wallet).contents = await lockContents(
      password,
      (this as Wallet).contents
    );
    (this as Wallet).status = WalletStatus.Locked;
    return this;
  },
  unlock: async function(password: string): Promise<Wallet> {
    (this as Wallet).contents = await unlockContents(
      password,
      (this as Wallet).contents
    );
    (this as Wallet).status = WalletStatus.Unlocked;
    return this;
  },
  export: async function(password: string): Promise<any> {
    const seed = await passwordToKey(password);
    const didDoc = await unlockDidKey(seed);
    // we don't want to leak number of wallet contents...
    // so we push them into a single object before encrypting.
    const lockedContents = await lockContents(password, [
      {
        contents: (this as Wallet).contents,
      },
    ]);
    const encryptedWallet = {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://w3c-ccg.github.io/universal-wallet-interop-spec/contexts/wallet-v1.json',
      ],
      // consider using content id of ciphertext here...
      id: didDoc.id + '#encrypted-wallet',
      type: ['VerifiableCredential', 'EncryptedWallet'],
      issuer: didDoc.id,
      issuanceDate: new Date().toISOString(),
      credentialSubject: {
        id: didDoc.id,
        encryptedWalletContents: lockedContents[0],
      },
    };
    return encryptedWallet;
  },
  import: async function(
    encryptedWalletCredential: any,
    password: string
  ): Promise<any> {
    if (this.contents.length) {
      throw new Error('Cannot import over existing wallet content.');
    }
    const unlockedContents = await unlockContents(password, [
      encryptedWalletCredential.credentialSubject.encryptedWalletContents,
    ]);
    this.contents = unlockedContents[0].contents;
    this.status = WalletStatus.Unlocked;
    return this;
  },
  query: function(map: any, reduce: any, initialValue: any) {
    if (this.status !== WalletStatus.Unlocked) {
      throw new Error('You can only query an unlocked wallet.');
    }
    let results = this.contents.map(map);
    if (reduce) {
      return results.reduce(reduce, initialValue);
    }
    return results;
  },
};

const walletFactory = Factory.Sync.makeFactory<Wallet>(walletDefaults);

const wallet = walletFactory.build();

export { Wallet, walletFactory, walletDefaults, wallet };
