import { EOL } from 'os';
import yargs from 'yargs';

import { stylecheck } from './stylecheck';
import { stories2csv } from './stories2csv';

const FEATURES = {
  stylecheck,
  stories2csv,
};

const parseArgs = (argv: string[]): Promise<{output: string, args: any}> =>
  new Promise((resolve, reject) => {
    yargs
      .strict()
      .demandCommand(1, 'Please specify at least one command!')
      .command('stories2csv', 'Creates csv file for Jira from markdown story definitions', (yargs) => {
        return yargs.options({
          'i': {
            alias: 'input_file',
            demandOption: true,
            type: 'string',
            requiresArg: true,
          },
          'o': {
            alias: 'output_file',
            demandOption: true,
            type: 'string',
            requiresArg: true,
          }
        });
      })
      .parse(argv, (err: any, args: any, output: any) => {
        if (err) {
          reject({err, args, output});
        } else {
          resolve({args, output});
        }
      });
  });

export async function runCli({argv, stdout, stderr}: NodeJS.Process): Promise<number> {
  try {
    const { output, args } = await parseArgs(argv.slice(2));
    if (args._.length) {
      await FEATURES[args._[0]](args);
      stdout.write("" + EOL);
      return 0;
    }
    stdout.write(output + EOL);
    return 0;
  } catch ({err, output}) {
    stderr.write(output + EOL);
    return 1;
  }
}
