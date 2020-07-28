import { EOL } from 'os';

const SEPARATOR = ',';

export const generate = (rows: string[][]) =>
  rows.map(row => row.join(SEPARATOR)).join(EOL);
