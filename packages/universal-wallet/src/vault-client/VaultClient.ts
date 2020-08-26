import { Ed25519KeyPair } from '@transmute/did-key-ed25519';
import { X25519KeyPair } from '@transmute/did-key-x25519';

import Hmac from './Hmac';
import KeyAgreementKey from './KeyAgreementKey';
import Invoker from './Invoker';

import { EdvClient } from 'edv-client';

export interface IEdvVendorConfig {
  account_seed: string;
  vault_endpoint: string;
  hmac_secret: string;
}

export class VaultClient {
  public vault_endpoint: string = '';
  public keys: any;
  public invocationSigner: any;
  public keyResolver: any;
  public vault: any;

  static fromDerivedContents = async (
    vault_endpoint: string,
    ed25519Key: any,
    x25519Key: any,
    hmacSecret: Buffer
  ) => {
    const invocationSigner = new Invoker(new Ed25519KeyPair(ed25519Key));
    const keyAgreementKey = new KeyAgreementKey(new X25519KeyPair(x25519Key));
    const hmac = await Hmac.create(hmacSecret);
    const client = new VaultClient(
      vault_endpoint,
      invocationSigner,
      keyAgreementKey,
      hmac
    );
    await client.getClient();
    return client;
  };

  constructor(
    vault_endpoint: string,
    invocationSigner: Invoker,
    keyAgreementKey: KeyAgreementKey,
    hmac: Hmac
  ) {
    this.vault_endpoint = vault_endpoint;
    this.keys = {};
    this.invocationSigner = invocationSigner;
    this.keys.keyAgreementKey = keyAgreementKey;
    this.keys.hmac = hmac;
    this.keyResolver = ({ id }: any) => {
      if (this.keys.keyAgreementKey.id === id) {
        return this.keys.keyAgreementKey;
      }
      throw new Error(`Key ${id} not found`);
    };
  }

  async createEdv({ controller, referenceId }: any = {}) {
    const { keyAgreementKey, hmac } = this.keys;
    let config: any = {
      sequence: 0,
      controller: controller || this.invocationSigner.id,
      keyAgreementKey: { id: keyAgreementKey.id, type: keyAgreementKey.type },
      hmac: { id: hmac.id, type: hmac.type },
    };
    if (referenceId) {
      config.referenceId = referenceId;
    }
    config = await EdvClient.createEdv({
      url: this.vault_endpoint,
      config,
    });

    return new EdvClient({
      id: this.vault_endpoint + '/' + config.id,
      keyAgreementKey,
      hmac,
    });
  }

  async getClient() {
    const { keyAgreementKey, hmac } = this.keys;
    // console.log(keyAgreementKey, hmac, this.invocationSigner);
    let _config = await EdvClient.findConfig({
      url: this.vault_endpoint,
      controller: this.invocationSigner.controller,
      referenceId: this.invocationSigner.controller + '#primary',
    });

    if (_config) {
      this.vault = new EdvClient({
        id: this.vault_endpoint + '/' + _config.id,
        keyAgreementKey,
        hmac,
      });
      return this.vault;
    }
    this.vault = await this.createEdv({
      controller: this.invocationSigner.controller,
      referenceId: this.invocationSigner.controller + '#primary',
    });
    return this.vault;
  }

  async addWalletContent(doc: any) {
    this.vault.ensureIndex({ attribute: 'content.schema' });
    this.vault.ensureIndex({ attribute: 'content.data.id', unique: true });
    return await this.vault.update({
      keyResolver: this.keyResolver,
      invocationSigner: this.invocationSigner,
      doc,
    });
  }

  async getWalletContents() {
    const { documents } = await this.vault.find({
      invocationSigner: this.invocationSigner,
      equals: { 'content.schema': 'https://schema.org/UniversalWallet' },
    });
    return documents.map((d: any) => {
      return d.content.data;
    });
  }
}
