import type { Cli } from './cli';

export const fakeCli: () => Cli = () => ({
  async cwd(directory: string): Promise<void> {
    console.log(directory);
  },
  async writeFile({name, content}: {name: string, content: string}): Promise<void> {
    console.log(name, content);
  },
  async run(content: string): Promise<void> {
    console.log(content);
  },
  async readFile(name: string): Promise<string> {
    return name;
  },
  async setup(directory: string): Promise<void> {
    console.log(`Set up in ${directory}`);
  },
  async tearDown(): Promise<void> {},
});
