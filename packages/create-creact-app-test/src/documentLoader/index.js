import { production } from "@transmute/jsonld-document-loader";

const documentLoader = (uri) => {
  if (
    uri ===
    "https://w3c-ccg.github.io/universal-wallet-interop-spec/contexts/wallet-v1.json"
  ) {
    return Promise.resolve({
      contextUrl: null,
      documentUrl: uri,
      document: JSON.stringify(require("./wallet-v1.json")),
    });
  }
  return production.documentLoader(uri);
};

export { documentLoader };
