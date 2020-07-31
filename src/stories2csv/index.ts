import { promises as fs } from 'fs';
import { parse } from './parse';
import { transform } from './transform';
import { generate } from './generate';

export const stories2csv = async (argv: string[]) => {
  const contentBuffer = await fs.readFile(argv[4]);
  const content = contentBuffer.toString();
  const parsedContent = parse(content);
  const rows = transform(parsedContent.stories);
  return fs.writeFile(argv[6], generate(rows), 'utf-8');
};
