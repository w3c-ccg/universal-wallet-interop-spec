import {
  lockContents,
  unlockContents,
  issue,
  verifyCredential,
  createVerifiablePresentation,
  verifyPresentation,
} from './security';

export enum WalletStatus {
  Locked = 'LOCKED',
  Unlocked = 'UNLOCKED',
}

export class UniversalWallet2020 {
  public contents: any[] = [];
  public status: WalletStatus = WalletStatus.Unlocked;

  private _expandVerificationMethod = (options: any) => {
    const map = (content: any) => {
      return content;
    };
    const reduce = (initialValue: any, item: any) => {
      item.controller.forEach((controller: string) => {
        if (!initialValue[controller]) {
          initialValue[controller] = item;
          initialValue[controller].id = controller;
        }
      });
      return initialValue;
    };
    const initialValue = {};
    const results = this.query(map, reduce, initialValue);
    const { verificationMethod } = options;
    if (!results[verificationMethod]) {
      throw new Error(
        'Wallet does not contain verificationMethod ' + verificationMethod
      );
    }
    options.verificationMethod = results[verificationMethod];
    return options;
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
        'https://www.w3.org/2018/credentials/v1',
        'https://w3id.org/wallet/v1',
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
      throw new Error('You can only query an ulocked wallet.');
    }
    let results = this.contents.map(map);
    if (reduce) {
      return results.reduce(reduce, initialValue);
    }
    return results;
  };

  public issue = async ({ credential, options }: any): Promise<any> => {
    const _options = this._expandVerificationMethod(options);
    return issue({ credential, options: _options });
  };

  public verify = async ({ credential, presentation, options }: any) => {
    if (credential) {
      return verifyCredential({ credential });
    }
    if (presentation) {
      return verifyPresentation({ presentation, options });
    }
  };

  public prove = async ({ verifiableCredential, options }: any) => {
    const _options = this._expandVerificationMethod(options);
    _options.holder = options.verificationMethod.id.split('#')[0];
    return createVerifiablePresentation({
      verifiableCredential,
      options: _options,
    });
  };
}
