import {
  production,
  IDocumentLoaderResponse,
} from '@transmute/jsonld-document-loader';

import issuers from './issuers';

const documentLoader = (uri: string): Promise<IDocumentLoaderResponse> => {
  // uncomment to see url's that re resolved as part of context processing.
  // console.log(uri);
  const _uriWithoutFragment = uri.split('#')[0];
  if ((issuers as any)[_uriWithoutFragment]) {
    return Promise.resolve({
      contextUrl: null,
      documentUrl: uri,
      document: JSON.stringify((issuers as any)[_uriWithoutFragment]),
    });
  }
  // use the safe defaults provided
  return production.documentLoader(uri);
};

export { documentLoader };
