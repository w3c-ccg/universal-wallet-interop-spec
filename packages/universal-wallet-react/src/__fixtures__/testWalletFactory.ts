import * as Factory from 'factory.ts';
import * as Wallet from '@transmute/universal-wallet';
import * as DidKey from '@transmute/universal-wallet-did-key-plugin';
import * as Vc from '@transmute/universal-wallet-vc-plugin';

interface TestWallet extends Wallet.Wallet, DidKey.DidKeyPlugin, Vc.VcPlugin {}

const testWalletFactory = Factory.Sync.makeFactory<TestWallet>({
  ...Wallet.walletDefaults,
  ...DidKey.factoryDefaults,
  ...Vc.factoryDefaults,
})
  .combine(Wallet.walletFactory)
  .combine(DidKey.pluginFactory)
  .combine(Vc.pluginFactory);

export { testWalletFactory };
