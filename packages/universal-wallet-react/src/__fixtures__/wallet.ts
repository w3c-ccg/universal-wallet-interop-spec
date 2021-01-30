import {
  walletFactory,
  passwordToKey,
  seedToId,
} from '@transmute/universal-wallet';

export const wallet = walletFactory.build();

export { passwordToKey, seedToId };
