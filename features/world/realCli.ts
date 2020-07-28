import { promises as fs } from 'fs';
import util from 'util';
import childProcess from 'child_process';
import path from 'path';
import type { Cli } from './cli';

const exec = util.promisify(childProcess.exec);

export const realCli: () => Cli = () => {
  const originalCwd = process.cwd();
  let testDirectory: string = '.test';

  return {
    async cwd(directory: string) {
      const fullPath = path.join(testDirectory, directory);
      await fs.mkdir(fullPath, { recursive: true });
      process.chdir(fullPath);
    },
    async writeFile({name, content}: {name: string, content: string}): Promise<void> {
      return fs.writeFile(name, content, 'utf-8');
    },
    async run(content: string): Promise<void> {
      const obj = await exec(content);
      console.log(obj);
    },
    async readFile(name: string): Promise<string> {
      const content = await fs.readFile(name);
      return content.toString();
    },
    async setup(directory: string) {
      testDirectory = directory;
      return fs.mkdir(directory, { recursive: true });
   },
    async tearDown() {
      process.chdir(originalCwd);
      return fs.rmdir(testDirectory, { recursive: true })
    },
  }
};
