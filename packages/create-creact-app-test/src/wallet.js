import * as Factory from "factory.ts";
import * as DidKey from "@transmute/universal-wallet-did-key-plugin";
import * as Vc from "@transmute/universal-wallet-vc-plugin";

import { walletFactory, walletDefaults } from "@transmute/universal-wallet";

const didKeyWalletFactory = Factory.Sync.makeFactory({
  ...walletDefaults,
  ...DidKey.factoryDefaults,
  ...Vc.factoryDefaults,
})
  .combine(walletFactory)
  .combine(DidKey.pluginFactory)
  .combine(Vc.pluginFactory);

const wallet = didKeyWalletFactory.build();

export { wallet };
