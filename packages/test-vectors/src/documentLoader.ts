import {
  documentLoaderFactory,
  contexts,
} from '@transmute/jsonld-document-loader';

import { issuers } from './data/issuers.json';

import wallet_v1 from './data/wallet-v1.json';

let golem = documentLoaderFactory.pluginFactory.build({
  contexts: {
    ...contexts.W3C_Decentralized_Identifiers,
    ...contexts.W3C_Verifiable_Credentials,
    ...contexts.W3ID_Security_Vocabulary,
    'https://w3c-ccg.github.io/universal-wallet-interop-spec/contexts/wallet-v1.json': wallet_v1,
  } as any,
});

// add a resolver to each issuer... and no others.
Object.keys(issuers).forEach((issuer) => {
  golem.addResolver({
    [issuer]: {
      resolve: (uri: string) => {
        const document = (issuers as any)[uri.split('#')[0]];
        return Promise.resolve(document);
      },
    },
  });
});

const documentLoader = golem.buildDocumentLoader();

export { documentLoader };
