import { setWorldConstructor } from 'cucumber';

import type { Cli } from './cli';
import { realCli } from './realCli';
import { fakeCli } from './fakeCli';

export class CliWorld {
  cli: Cli;
  constructor({parameters: {environment}}: {parameters: {environment: string}}) {
    this.cli = environment == 'real' ? realCli() : fakeCli();
  }
}

setWorldConstructor(CliWorld);
