import {
  passwordToKey,
  lockContents,
  unlockContents,
  generateDefaultContents,
} from './security';

export enum WalletStatus {
  Locked = 'LOCKED',
  Unlocked = 'UNLOCKED',
}

export class UniversalWallet2020 {
  public status: WalletStatus = WalletStatus.Unlocked;

  constructor(public contents: any[] = []) {
    this.status = WalletStatus.Unlocked;
  }

  static passwordToSeed = async (password: string) => {
    return passwordToKey(password);
  };

  static generate = async (seed: Uint8Array) => {
    const contents = await generateDefaultContents(seed);
    const wallet = new UniversalWallet2020(contents);
    return wallet;
  };

  public registerPlugin = (plugin: any) => {
    const pluginMethods = plugin();

    console.log(pluginMethods);
  };
  public add = (content: any) => {
    this.contents.push(content);
    return content;
  };
  public remove = (contentId: any) => {
    let index = this.contents.findIndex((c: any) => {
      return c.id === contentId;
    });
    let content = this.contents[index];
    this.contents = this.contents.splice(index, index);
    return content;
  };

  public lock = async (password: string) => {
    this.contents = await lockContents(password, this.contents);
    this.status = WalletStatus.Locked;
  };

  public unlock = async (password: string) => {
    this.contents = await unlockContents(password, this.contents);
    this.status = WalletStatus.Unlocked;
  };

  public export = (controller: string = 'did:example:123'): string => {
    if (this.status !== WalletStatus.Locked) {
      throw new Error('You cannot export an unlocked wallet.');
    }
    const encryptedWallet = {
      '@context': [
        'https://transmute-industries.github.io/universal-wallet/contexts/wallet-v1.json',
      ],
      id: 'http://example.gov/wallet/3732',
      type: ['VerifiableCredential', 'EncryptedWallet'],
      issuer: controller,
      issuanceDate: new Date().toISOString(),
      credentialSubject: {
        id: controller,
        contents: this.contents,
      },
    };
    return JSON.stringify(encryptedWallet);
  };

  public import = (encryptedWallet: string) => {
    if (this.contents.length) {
      throw new Error('You cannot import over existing wallet content.');
    }
    const parsed = JSON.parse(encryptedWallet);
    // TODO: validate
    this.contents = parsed.credentialSubject.contents;
    // disregard other data for now...
    this.status = WalletStatus.Locked;
  };

  public query = (map: any, reduce?: any, initialValue?: Object): any => {
    if (this.status !== WalletStatus.Unlocked) {
      throw new Error('You can only query an unlocked wallet.');
    }
    let results = this.contents.map(map);
    if (reduce) {
      return results.reduce(reduce, initialValue);
    }
    return results;
  };
}
