# @transmute/universal-wallet

```
npm i @transmute/universal-wallet --save
```

## Getting Started

```
git clone git@github.com:w3c-ccg/universal-wallet-interop-spec.git
npm packages/universal-wallet; // note that this is a mono repo
npm i
npm run lint
npm run test
npm run build
```

## Interface

### Contructor

```ts
import { UniversalWallet2020 } from '@transmute/universal-wallet';
// or
const { UniversalWallet2020 } = require('@transmute/universal-wallet');

const wallet = new UniversalWallet2020();
const password = 'correct horse battery staple';
```

### Add

```ts
const content = {
  id: 'urn:uuid:e8fc7810-9524-11ea-bb37-0242ac130002',
  title: 'My Test Key 2',
  image: 'https://via.placeholder.com/150',
  description: 'For testing only, totally compromised.',
  tags: ['professional', 'organization', 'compromised'],
  correlation: ['4058a72a-9523-11ea-bb37-0242ac130002'],
  controller: [
    'did:key:z6MkjjCpsoQrwnEmqHzLdxWowXk5gjbwor4urC1RPDmGeV8r#z6MkjjCpsoQrwnEmqHzLdxWowXk5gjbwor4urC1RPDmGeV8r',
  ],
  type: 'Ed25519VerificationKey2018',
  privateKeyBase58:
    '3CQCBKF3Mf1tU5q1FLpHpbxYrNYxLiZk4adDtfyPEfc39Wk6gsTb2qoc1ZtpqzJYdM1rG4gpaD3ZVKdkiDrkLF1p',
  publicKeyBase58: '6GwnHZARcEkJio9dxPYy6SC5sAL6PxpZAB6VYwoFjGMU',
};

wallet.add(content);
```

### Remove

```ts
wallet.remove('urn:uuid:e8fc7810-9524-11ea-bb37-0242ac130002');
```

### Lock

```ts
// you can only lock a wallet that has content
// wallet.add(content);
await wallet.lock(password);
```

### Unlock

```ts
await wallet.unlock(password);
```

### Export

```ts
// you can only export a wallet that is locked.
await wallet.lock(password);
const encryptedWallet = wallet.export();
```

### Import

```ts
wallet.import(encryptedWallet);
```

### Query

```ts
// count unique correlations
const map = (content: any) => {
  return content.correlation;
};
const reduce = (initialValue: any, item: any) => {
  item.forEach((correlation: any) => {
    if (!initialValue[correlation]) {
      initialValue[correlation] = 1;
    } else {
      initialValue[correlation]++;
    }
  });
  return initialValue;
};
const initialValue = {};
const results = wallet.query(map, reduce, initialValue);
```

### Issue

```ts
const verifiableCredential = await wallet.issue({
  credential: { //..some verifiable credential without a proof },
  options: {
    verificationMethod:
      'did:key:z6MkjjCpsoQrwnEmqHzLdxWowXk5gjbwor4urC1RPDmGeV8r#z6MkjjCpsoQrwnEmqHzLdxWowXk5gjbwor4urC1RPDmGeV8r',
    proofPurpose: 'assertionMethod',
    created: '2020-04-02T18:48:36Z',
  },
});
```

### Prove

```ts
const verifiablePresentation = await wallet.prove({
  verifiableCredential: [verifiableCredential],
  options: {
    domain: 'verifier.example.com',
    challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
    verificationMethod:
      'did:key:z6MkjjCpsoQrwnEmqHzLdxWowXk5gjbwor4urC1RPDmGeV8r#z6MkjjCpsoQrwnEmqHzLdxWowXk5gjbwor4urC1RPDmGeV8r',
  },
});
```

### Verify

```ts
const verification = await wallet.verify({
  credential: verifiableCredential,
});
// or
const verification = await wallet.verify({
  presentation: verifiablePresentation,
  options: {
    challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
    domain: 'verifier.example.com',
  },
});
// expect(verification.verified).toBe(true);
```
