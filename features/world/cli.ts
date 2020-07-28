export interface Cli {
  cwd(directory: string): Promise<void>;
  writeFile(args: {name: string, content: string}): Promise<void>;
  run(command: string): Promise<void>;
  readFile(name: string): Promise<string>;
  setup(directory: string): Promise<void>;
  tearDown(): Promise<void>;
}