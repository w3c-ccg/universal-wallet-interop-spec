import { unlockedDids } from '../__fixtures__';

export const keyResolver = ({ id }: any) => {
  let keyAgreementKey =
    unlockedDids['did:key:z6MktGVfipjBkipFvdE3qGBPQe9heMSuWpgdNVStAfjUsmXV']
      .verificationMethod[1];
  if (keyAgreementKey.id === id) {
    return keyAgreementKey;
  }
  throw new Error(`Key ${id} not found in fixtures`);
};
