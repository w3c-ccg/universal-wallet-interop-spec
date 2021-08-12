import * as Factory from 'factory.ts';
import {
  factory as didDocumentFactory,
  DidDocument,
} from '@did-core/data-model';
import { representation } from '@did-core/did-ld-json';
import { DidDocumentIndex, VerificationMethodIndex } from './types';

import { generate } from './generate';

export interface DidWebWallet {
  didDocuments: DidDocumentIndex;
  verificationMethods: VerificationMethodIndex;
  generate: (endpoint: string) => Promise<DidWebWallet>;
  addVerificationMethod: (keypair: any) => DidWebWallet;
  addDidDocument: (didDocument: DidDocument) => DidWebWallet;
}

export const factoryDefaults: DidWebWallet = {
  didDocuments: {},
  verificationMethods: {},
  generate: async function(endpoint: string): Promise<DidWebWallet> {
    const { keys, didDocument } = await generate(endpoint);
    keys.forEach(k => {
      this.addVerificationMethod(k);
    });
    this.addDidDocument(
      await didDocumentFactory
        .build()
        .addRepresentation({ [representation.contentType]: representation })
        .consume(
          representation.contentType,
          Buffer.from(JSON.stringify(didDocument))
        )
    );
    return this;
  },
  addDidDocument: function(didDocument: DidDocument): DidWebWallet {
    this.didDocuments[(didDocument.entries as any).id] = didDocument;
    return this;
  },
  addVerificationMethod: function(keypair: any): DidWebWallet {
    this.verificationMethods[keypair.id] = keypair;
    return this;
  },
};

export const factory = Factory.Sync.makeFactory<DidWebWallet>(factoryDefaults);
