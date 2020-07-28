import { stylecheck } from './stylecheck';
import { stories2csv } from './stories2csv';

const FEATURES = {
  stylecheck,
  stories2csv,
}

export async function runCli(argv: string[]): Promise<number> {
  if (Object.keys(FEATURES).includes(argv[2])) {
    await FEATURES[argv[2]](argv).catch(console.log);
  }
  return 0;
}
