import { default as unlockedDIDs } from './unlockedDIDs';

export const keyResolver = ({ id }: any) => {
  let keyAgreementKey =
    unlockedDIDs['did:key:z6MktGVfipjBkipFvdE3qGBPQe9heMSuWpgdNVStAfjUsmXV']
      .keyAgreement[0];
  if (keyAgreementKey.id === id) {
    return keyAgreementKey;
  }
  throw new Error(`Key ${id} not found in fixtures`);
};
