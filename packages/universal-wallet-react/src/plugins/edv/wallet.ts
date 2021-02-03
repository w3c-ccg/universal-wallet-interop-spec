import * as Factory from 'factory.ts';
import * as didKeyPlugin from '@transmute/universal-wallet-did-key-plugin';
import * as vcPlugin from '@transmute/universal-wallet-vc-plugin';
import * as edvPlugin from '@transmute/universal-wallet-edv-plugin';

import {
  walletFactory,
  Wallet,
  walletDefaults,
} from '@transmute/universal-wallet';

interface DidKeyWallet
  extends Wallet,
    didKeyPlugin.DidKeyPlugin,
    vcPlugin.VcPlugin,
    edvPlugin.EdvPlugin {}

const didKeyWalletFactory = Factory.Sync.makeFactory<DidKeyWallet>({
  ...walletDefaults,
  ...didKeyPlugin.factoryDefaults,
  ...vcPlugin.factoryDefaults,
  ...edvPlugin.factoryDefaults,
})
  .combine(walletFactory)
  .combine(didKeyPlugin.pluginFactory)
  .combine(vcPlugin.pluginFactory)
  .combine(edvPlugin.pluginFactory);

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
  {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      'https://www.w3.org/2018/credentials/examples/v1',
    ],
    id: 'http://example.gov/credentials/3732',
    type: ['VerifiableCredential', 'UniversityDegreeCredential'],
    issuer: 'did:key:z6Mkf7FWHfJANm9n4hPMt3dmtAcqnkNuyJLHSovSMnfq4Wws',
    issuanceDate: '2020-03-10T04:24:12.164Z',
    credentialSubject: {
      id: 'did:key:z6MkjjCpsoQrwnEmqHzLdxWowXk5gjbwor4urC1RPDmGeV8r',
      degree: {
        type: 'BachelorDegree',
        name: 'Bachelor of Science and Arts',
      },
    },
    proof: [
      {
        type: 'Ed25519Signature2018',
        created: '2021-01-31T14:40:48.328Z',
        jws:
          'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..1SL3Zgzvt7bvQPdJe1kUu6LKSJ3pjHAgb49EDVutCyE0StgKfwOVZBOLPDzSUGJBJLRcw5ddFXTzUgoaKSfdAA',
        proofPurpose: 'assertionMethod',
        verificationMethod:
          'did:key:z6Mkf7FWHfJANm9n4hPMt3dmtAcqnkNuyJLHSovSMnfq4Wws#z6Mkf7FWHfJANm9n4hPMt3dmtAcqnkNuyJLHSovSMnfq4Wws',
      },
    ],
  },
  {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiablePresentation'],
    holder: 'did:key:z6Mkf7FWHfJANm9n4hPMt3dmtAcqnkNuyJLHSovSMnfq4Wws',
    verifiableCredential: {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://www.w3.org/2018/credentials/examples/v1',
      ],
      id: 'http://example.gov/credentials/3732',
      type: ['VerifiableCredential', 'UniversityDegreeCredential'],
      issuer: 'did:key:z6Mkf7FWHfJANm9n4hPMt3dmtAcqnkNuyJLHSovSMnfq4Wws',
      issuanceDate: '2020-03-10T04:24:12.164Z',
      credentialSubject: {
        id: 'did:key:z6MkjjCpsoQrwnEmqHzLdxWowXk5gjbwor4urC1RPDmGeV8r',
        degree: {
          type: 'BachelorDegree',
          name: 'Bachelor of Science and Arts',
        },
      },
      proof: {
        type: 'Ed25519Signature2018',
        created: '2021-01-31T15:20:07.783Z',
        jws:
          'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..JOoVxfxNnRYJ_4HRTsZbtaCN6V1T8Otaho8zG7ezYStnj2xUoss_3tEPOCcACyesVPMK2X4aB0WILuQHdy2JCw',
        proofPurpose: 'assertionMethod',
        verificationMethod:
          'did:key:z6Mkf7FWHfJANm9n4hPMt3dmtAcqnkNuyJLHSovSMnfq4Wws#z6Mkf7FWHfJANm9n4hPMt3dmtAcqnkNuyJLHSovSMnfq4Wws',
      },
    },
    proof: {
      type: 'Ed25519Signature2018',
      created: '2021-01-31T15:20:35.651Z',
      challenge: '8bb1cfda-9d31-46fc-9742-72b48747a2f1',
      domain: 'example.com',
      jws:
        'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..xVdnERITPrbwKv3086IzHgP-ffS_BgXwe_CTqZHPugvofhpw_cwvK4r8IrluBNT1QGpGN1O6MdFRiMiiIkmoCA',
      proofPurpose: 'authentication',
      verificationMethod:
        'did:key:z6Mkf7FWHfJANm9n4hPMt3dmtAcqnkNuyJLHSovSMnfq4Wws#z6Mkf7FWHfJANm9n4hPMt3dmtAcqnkNuyJLHSovSMnfq4Wws',
    },
  },
];

export const wallet = didKeyWalletFactory.build({
  contents,
});
