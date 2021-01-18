// import { walletFactory } from '@transmute/universal-wallet';

// export const wallet = walletFactory.build();

export const wallet = {
  passwordToKey: async (password: string) => {
    return new Uint8Array(Buffer.from(password));
  },
  seedToId: async (seed: Uint8Array) => {
    return 'urn:uuid:' + Buffer.from(seed).toString('hex');
  },
};
