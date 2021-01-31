import { driver } from '@transmute/did-key-ed25519';

export const documentLoader = async (iri: string) => {
  if (iri.startsWith('did:key:z6')) {
    const { didDocument } = await driver.resolve(iri, {
      accept: 'application/did+ld+json',
    });

    return {
      documentUrl: iri,
      document: didDocument,
    };
  }

  try {
    const response = await fetch(iri);
    const document = await response.json();

    return {
      documentUrl: iri,
      document,
    };
  } catch (e) {
    console.log(e);
  }

  console.log(iri);
  throw new Error('unsupported iri');
};
