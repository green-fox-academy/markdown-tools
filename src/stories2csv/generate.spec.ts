import { EOL } from 'os';

import { generate } from './generate';

test('generate empty file', () => {
  expect(generate([])).toEqual('');
});

test('generate single row', () => {
  expect(generate([['a', 'b', 'c']])).toEqual('a,b,c');
});

test('generate multiple rows', () => {
  expect(generate([['a', 'b'], ['c', 'd']])).toEqual(`a,b${EOL}c,d`);
});

test('generate cell with new line', () => {
  expect(generate([[`a${EOL}b`]])).toEqual(`"a${EOL}b"`);
})

test('generate cell with new line and escape "', () => {
  expect(generate([[`a${EOL}"b`]])).toEqual(`"a${EOL}\\"b"`);
})



