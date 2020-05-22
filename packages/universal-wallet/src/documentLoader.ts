import resolver from './resolver';

const jsonld = require('jsonld');

export const documentLoader = async (uri: string) => {
  if (uri.indexOf('did') === 0) {
    const didDocument = await resolver.resolve(uri);
    return {
      contextUrl: null, // this is for a context via a link header
      document: didDocument, // this is the actual document that was loaded
      documentUrl: uri, // this is the actual context URL after redirects
    };
  }
  try {
    // console.log('downloading...', url);
    const res = await jsonld.documentLoader(uri);
    return res;
  } catch (e) {
    // eslint-disable-next-line
    console.error(`No remote context support for ${uri}`);
  }
};

export default documentLoader;
