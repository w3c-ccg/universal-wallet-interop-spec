import * as fs from 'fs';
import * as path from 'path';

const seed = fs
  .readFileSync(path.resolve(__dirname, './data/seed.txt'))
  .toString();

const content = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './data/content.json')).toString()
);

export { seed, content };
