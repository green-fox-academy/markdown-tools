import { promises as fs } from 'fs';
import { parse } from './parse';

console.log('convert');

const main = async () => {
  const contentBuffer = await fs.readFile('./test/tribes.md');
  const content = contentBuffer.toString();
  console.log(parse(content));
};

main();
