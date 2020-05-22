export { default as unlockedDIDs } from './unlockedDIDs';

export * from './documentLoader';
export * from './keyResolver';

export const walletContents = {
  key0: require('./json/key0.json'),
};

export const encryptedWallet = JSON.stringify(
  require('./json/encryptedWallet.json'),
  null,
  2
);

export const credential = require('./json/credential.json');
export const verifiableCredential = require('./json/verifiableCredential.json');
export const verifiablePresentation = require('./json/verifiablePresentation.json');
