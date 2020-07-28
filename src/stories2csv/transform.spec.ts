import { transform } from './transform';

test('transform empty to header', () => {
  expect(transform([])).toEqual([
    [ 'Summary', 'Issue id', 'Parent id', 'Issue Type', 'Description' ],
  ]);
});

test('transform single story', () => {
  expect(transform([{
    title: 'Test Story',
    description: 'More details\n',
    valueStatement: 'As somebody, I can do something, so I am happy',
    acceptanceCriteria: '- It should be awesome\n',
    defintionOfDone: '',
    subTasks: [],
  }])).toEqual([
    [ 'Summary', 'Issue id', 'Parent id', 'Issue Type', 'Description' ],
    [ 'Test Story', '1', '', 'Story', 'h2.Description\n\nAs somebody, I can do something, so I am happy\n\nMore details\n\nh2.Acceptance Criteria\n\n- It should be awesome\n' ],
  ]);
});
