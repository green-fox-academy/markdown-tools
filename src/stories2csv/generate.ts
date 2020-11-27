import { EOL } from 'os';

const SEPARATOR = ',';

export const generate = (rows: string[][]): string =>
  rows.map(row => row.map(wrapIfHasEOL).join(SEPARATOR)).join(EOL);

const wrapIfHasEOL = (input: string): string =>
  input.includes(EOL) ?
    `"${input.replace(/"/g, '\\"')}"` :
    input;
