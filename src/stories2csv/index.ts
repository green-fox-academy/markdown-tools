import { promises as fs } from 'fs';
import { parse } from './parse';
import { transform } from './transform';
import { generate } from './generate';

export const stories2csv = async (argv: any) => {
  try {
    const contentBuffer = await fs.readFile(argv.i);
    const content = contentBuffer.toString();
    const parsedContent = parse(content);
    const rows = transform(parsedContent.stories);
    return fs.writeFile(argv.o, generate(rows), 'utf-8');
  } catch (e) {
    if (e.code === 'ENOENT') {
      throw ({output: `Unable to open file: "${e.path}"`});
    }
  }
};
