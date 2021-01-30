import {
  walletFactory,
  passwordToKey,
  seedToId,
} from '@transmute/universal-wallet';

export const emptyWallet = walletFactory.build();

export const fullWallet = walletFactory.build({
  contents: [{ id: '123', type: '456' } as any],
});

export { passwordToKey, seedToId };
