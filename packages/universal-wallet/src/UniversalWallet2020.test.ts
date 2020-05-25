import { UniversalWallet2020 } from '.';

const { derivedContents } = require('../fixtures');

describe('UniversalWallet2020', () => {
  describe('generate', () => {
    it('known seed', async () => {
      const seed = Buffer.from(
        '4d3d7da2f70f69952f967110f08a7215beceff4d3690ea62be5824c90c308087',
        'hex'
      );
      let wallet = await UniversalWallet2020.generate(new Uint8Array(seed));
      // console.log(JSON.stringify(wallet.contents));
      expect(wallet.contents).toEqual(derivedContents);

      // const password = 'correct horse battery staple';
      // await wallet.lock(password);
      // console.log(wallet.export());
    });
  });

  it('contructor', () => {
    let wallet = new UniversalWallet2020();
    expect(wallet).toBeDefined();
  });
});
