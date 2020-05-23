import { password, encryptedWallet } from '../fixtures';
import { UniversalWallet2020 } from '../src/UniversalWallet2020';

const pako = require('pako');
const bs58 = require('bs58');

// TODO: lock should apply compression before encryption...
describe('encryptedWalletAsUri', () => {
  it('encoding a seed in a query string... seems unsafe...', async () => {
    const seed = await UniversalWallet2020.passwordToSeed(password);
    const uri = `https://nfc.did.ai/?seed=${Buffer.from(seed).toString('hex')}`;
    expect(uri).toBe(
      'https://nfc.did.ai/?seed=7052adea8f9823817065456ecad5bf24dcd31a698f7bc9a0b5fc170849af4226'
    );
  });

  it.skip('encoding the whole encrypted wallet in a uri... is a bad idea...', async () => {
    var output = pako.deflate(Buffer.from(encryptedWallet));
    const encoded = bs58.encode(output);
    const uri = `https://nfc.did.ai/?ct=${encoded}`;
    const url = new URL(uri);
    const encoded1 = url.search.split('?ct=').pop();
    expect(encoded1).toBe(encoded);
  });
});
