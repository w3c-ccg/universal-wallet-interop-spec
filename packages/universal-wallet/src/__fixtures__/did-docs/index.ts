const example1 = require('./example-1.json');
const example2 = require('./example-2.json');

const unlockedDids: any = {
  [example1.id]: example1,
  [example2.id]: example2,
};

export { unlockedDids };
