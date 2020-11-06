import { promises as fs } from 'fs';
import { spawn } from 'child_process';
import path from 'path';
import type { Cli } from './cli';

interface CommandResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

const runCliLine = (line: string): Promise<CommandResult> =>
  new Promise(resolve => {
    let stdout: string = '';
    let stderr: string = '';
    const [command, ...args] = line.split(' ');
    const spawned = spawn(command, args);

    spawned.stdout.on('data', data => {
      stdout += data;
    });

    spawned.stderr.on('data', data => {
      stdout += data;
    });

    spawned.on('close', exitCode => {
      resolve({
        stdout,
        stderr,
        exitCode,
      });
    })
  });

export const realCli: () => Cli = () => {
  const originalCwd = process.cwd();
  let testDirectory: string = '.test';
  let stdout: string = '';
  let stderr: string = '';
  let lastExitCode: number = 0;

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
      const obj = await runCliLine(content);
      stdout += obj.stdout;
      stderr += obj.stderr;
      lastExitCode = obj.exitCode;
    },
    async runSilent(content: string): Promise<void> {
      await runCliLine(content);
    },
    async readFile(name: string): Promise<string> {
      const content = await fs.readFile(name);
      return content.toString();
    },
    async setup(directory: string): Promise<void> {
      testDirectory = directory;
      return fs.mkdir(directory, { recursive: true });
    },
    async tearDown(): Promise<void> {
      process.chdir(originalCwd);
      return fs.rmdir(testDirectory, { recursive: true })
    },
    async getStdOut(): Promise<string> {
      return stdout;
    },
    async getStdErr(): Promise<string> {
      return stderr;
    },
    async getLastExitCode(): Promise<number> {
      return lastExitCode;
    },
  }
};
