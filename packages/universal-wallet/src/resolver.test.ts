import resolver from './resolver';
import { unlockedDids } from './__fixtures__';
it('resolve works', async () => {
  const didDocument = await resolver.resolve(
    'did:key:z6MkjjCpsoQrwnEmqHzLdxWowXk5gjbwor4urC1RPDmGeV8r'
  );
  expect(didDocument).toEqual(
    unlockedDids['did:key:z6MkjjCpsoQrwnEmqHzLdxWowXk5gjbwor4urC1RPDmGeV8r']
  );
});
