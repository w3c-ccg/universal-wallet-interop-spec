import * as Factory from 'factory.ts';
import * as UniversalWallet from '@transmute/universal-wallet';
import * as DidKey from '@transmute/universal-wallet-did-key-plugin';

interface TestWallet extends UniversalWallet.Wallet, DidKey.DidKeyPlugin {}

const testWalletFactory = Factory.Sync.makeFactory<TestWallet>({
  ...UniversalWallet.walletDefaults,
  ...DidKey.factoryDefaults,
})
  .combine(UniversalWallet.walletFactory)
  .combine(DidKey.pluginFactory);

export { testWalletFactory };
