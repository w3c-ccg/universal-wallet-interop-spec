const didKeyDriver = require('did-method-key').driver();

const resolve = async (did: string) => {
  const didDocument = await didKeyDriver.get({
    did,
  });
  return didDocument;
};

export default { resolve };
