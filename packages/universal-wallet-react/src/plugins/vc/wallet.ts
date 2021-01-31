import * as Factory from 'factory.ts';
import * as didKeyPlugin from '@transmute/universal-wallet-did-key-plugin';
import * as vcPlugin from '@transmute/universal-wallet-vc-plugin';

import {
  walletFactory,
  Wallet,
  walletDefaults,
} from '@transmute/universal-wallet';

interface DidKeyWallet
  extends Wallet,
    didKeyPlugin.DidKeyPlugin,
    vcPlugin.VcPlugin {}

const didKeyWalletFactory = Factory.Sync.makeFactory<DidKeyWallet>({
  ...walletDefaults,
  ...didKeyPlugin.factoryDefaults,
  ...vcPlugin.factoryDefaults,
})
  .combine(walletFactory)
  .combine(didKeyPlugin.pluginFactory)
  .combine(vcPlugin.pluginFactory);

const contents: any = [
  {
    id:
      'did:key:z6Mkf7FWHfJANm9n4hPMt3dmtAcqnkNuyJLHSovSMnfq4Wws#z6LSpndE8VEdX3kBMMFNnBjvha2ZypXxhBZCfW7qeojX2V6J',
    type: 'JsonWebKey2020',
    controller: 'did:key:z6Mkf7FWHfJANm9n4hPMt3dmtAcqnkNuyJLHSovSMnfq4Wws',
    publicKeyJwk: {
      kty: 'OKP',
      crv: 'X25519',
      x: 'ws7iLQ51Q-WthFo6GmXogAXIjoxMIkpJZnAI7l1kw2s',
    },
    privateKeyJwk: {
      kty: 'OKP',
      crv: 'X25519',
      d: 'MOsqlfxZN-jwi-WWv6U3exkqYCcnne4f-0lJ6ytG9mw',
      x: 'ws7iLQ51Q-WthFo6GmXogAXIjoxMIkpJZnAI7l1kw2s',
    },
    '@context': ['http://w3id.org/wallet/v1'],
    name: 'Encryption Key',
    image: 'https://via.placeholder.com/150',
    description: 'Used to derive symmetric keys for encryption.',
    tags: ['inception'],
    generatedFrom: [
      'urn:digest:a00b3be8b299033978e12f1db36a8ed208569c233fd52a733d96f11b039c8cb4',
    ],
  },
  {
    id:
      'did:key:z6Mkf7FWHfJANm9n4hPMt3dmtAcqnkNuyJLHSovSMnfq4Wws#z6Mkf7FWHfJANm9n4hPMt3dmtAcqnkNuyJLHSovSMnfq4Wws',
    type: 'JsonWebKey2020',
    controller: 'did:key:z6Mkf7FWHfJANm9n4hPMt3dmtAcqnkNuyJLHSovSMnfq4Wws',
    publicKeyJwk: {
      crv: 'Ed25519',
      x: 'Cbt14tXtdodI00aBKip3PokrO5bX-yaxawO8mHjIZvo',
      kty: 'OKP',
    },
    privateKeyJwk: {
      crv: 'Ed25519',
      d: 'W7Sbe4-ZRsymSSPBfhwXKCUl64JAo6Jv9iKhkn8jWZA',
      x: 'Cbt14tXtdodI00aBKip3PokrO5bX-yaxawO8mHjIZvo',
      kty: 'OKP',
    },
    '@context': ['http://w3id.org/wallet/v1'],
    name: 'Signing Key',
    image: 'https://via.placeholder.com/150',
    description: 'Used to produce digital signatures.',
    tags: ['inception'],
    generatedFrom: [
      'urn:digest:a00b3be8b299033978e12f1db36a8ed208569c233fd52a733d96f11b039c8cb4',
    ],
  },
];

export const wallet = didKeyWalletFactory.build({
  contents,
});
