import * as Factory from "factory.ts";
import * as DidKey from "@transmute/universal-wallet-did-key-plugin";
import * as Vc from "@transmute/universal-wallet-vc-plugin";
import * as Edv from "@transmute/universal-wallet-edv-plugin";

import { walletFactory, walletDefaults } from "@transmute/universal-wallet";

const factory = Factory.Sync.makeFactory({
  ...walletDefaults,
  ...DidKey.factoryDefaults,
  ...Vc.factoryDefaults,
  ...Edv.factoryDefaults,
})
  .combine(walletFactory)
  .combine(DidKey.pluginFactory)
  .combine(Vc.pluginFactory)
  .combine(Edv.pluginFactory);

const wallet = factory.build();

export { wallet };
