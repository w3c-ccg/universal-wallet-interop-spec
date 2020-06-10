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

export const password = 'correct horse battery staple';
export const didSeed =
  '7052adea8f9823817065456ecad5bf24dcd31a698f7bc9a0b5fc170849af4226';
export const hmacSecret = '49JUNpuy7808NoTTbB0q8rgRuPSMyeqSswCnWKr0MF4';

export const credential = require('./json/credential.json');
export const verifiableCredential = require('./json/verifiableCredential.json');
export const verifiableCredentialMeta = require('./json/verifiableCredentialMeta.json');
export const verifiablePresentation = require('./json/verifiablePresentation.json');
export const derivedContents = require('./json/derivedContents.json');
export const derivedContentsFromPassword = require('./json/derivedContentsFromPassword.json');
