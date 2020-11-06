import { EOL } from 'os';
import yargs from 'yargs';

import { stylecheck } from './stylecheck';
import { stories2csv } from './stories2csv';

const FEATURES = {
  stylecheck,
  stories2csv,
};

const parseArgs = (argv: string[]): Promise<{output: string, args: string[]}> =>
  new Promise((resolve, reject) => {
    yargs
      .strict()
      .demandCommand(1, 'Please specify at least one command!')
      .command('stories2csv', 'Creates csv file for Jira from markdown story definitions')
      .parse(argv, (err: any, args: any, output: any) => {
        if (err) {
          reject({err, args, output});
        } else {
          resolve({args, output});
        }
      });
  });

export async function runCli({argv, stdout, stderr}: NodeJS.Process): Promise<number> {
  if (Object.keys(FEATURES).includes(argv[2])) {
    await FEATURES[argv[2]](argv);
    return 0;
  }
  try {
    const { output } = await parseArgs(argv.slice(2));
    stdout.write(output + EOL);
    return 0;
  } catch ({err, output}) {
    stdout.write(output + EOL);
    return 1;
  }
}
