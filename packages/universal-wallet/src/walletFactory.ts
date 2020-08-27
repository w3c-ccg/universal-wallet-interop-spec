import * as Factory from 'factory.ts';

interface Wallet {
  status: string;
  contents: any[];
}

const walletDefaults = {
  status: 'UNLOCKED',
  contents: [],
};

const walletFactory = Factory.Sync.makeFactory<Wallet>(walletDefaults);

const wallet = walletFactory.build();

export { Wallet, walletFactory, walletDefaults, wallet };
