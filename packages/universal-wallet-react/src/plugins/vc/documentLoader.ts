export const documentLoader = async (iri: string) => {
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
