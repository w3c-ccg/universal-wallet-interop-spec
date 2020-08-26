export const documentLoader = (uri: string) => {
  return {
    contextUrl: null, // this is for a context via a link header
    document: {}, // this is the actual document that was loaded
    documentUrl: uri, // this is the actual context URL after redirects
  };
};
