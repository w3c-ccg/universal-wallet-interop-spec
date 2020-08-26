import { driver } from '@transmute/did-key-ed25519';

const resolve = async (did: string) => {
  const didDocument = await driver.get({
    did,
  });
  return didDocument;
};

export default { resolve };
