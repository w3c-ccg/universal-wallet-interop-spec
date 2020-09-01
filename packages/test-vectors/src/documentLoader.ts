import {
  documentLoaderFactory,
  contexts,
} from '@transmute/jsonld-document-loader';

import { issuers } from './data/issuers.json';

let golem = documentLoaderFactory.pluginFactory.build({
  contexts: {
    ...contexts.W3C_Decentralized_Identifiers,
    ...contexts.W3C_Verifiable_Credentials,
    ...contexts.W3ID_Security_Vocabulary,
  },
});

// add a resolver to each issuer... and no others.
Object.keys(issuers).forEach((issuer) => {
  golem.addResolver({
    [issuer]: {
      resolve: (uri: string) => {
        return Promise.resolve((issuers as any)[uri.split('#')[0]]);
      },
    },
  });
});

const documentLoader = golem.buildDocumentLoader();

export { documentLoader };
