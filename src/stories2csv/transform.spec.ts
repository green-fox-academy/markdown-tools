import { EOL } from 'os';
import { transform } from './transform';

test('transform empty to header', () => {
  expect(transform([])).toEqual([
    [ 'Summary', 'Issue id', 'Parent id', 'Issue Type', 'Description' ],
  ]);
});

test('transform single story', () => {
  expect(transform([{
    title: 'Test Story',
    description: 'More details',
    valueStatement: 'As somebody, I can do something, so I am happy',
    acceptanceCriteria: '- It should be awesome',
    defintionOfDone: '',
    subTasks: [],
  }])).toEqual([
    [ 'Summary', 'Issue id', 'Parent id', 'Issue Type', 'Description' ],
    [ 'Test Story', '1', '', 'Story', `h2.Description${EOL}As somebody, I can do something, so I am happy${EOL}More details${EOL}h2.Acceptance Criteria${EOL}- It should be awesome` ],
  ]);
});

test('transform single story', () => {
  expect(transform([{
    title: 'Test Story',
    description: 'More details',
    valueStatement: 'As somebody, I can do something, so I am happy',
    acceptanceCriteria: '- It should be awesome',
    defintionOfDone: '',
    subTasks: [{
      title: 'Task one',
      description: 'Do something unexpected',
    }],
  }])).toEqual([
    [ 'Summary', 'Issue id', 'Parent id', 'Issue Type', 'Description' ],
    [ 'Test Story', '1', '', 'Story', `h2.Description${EOL}As somebody, I can do something, so I am happy${EOL}More details${EOL}h2.Acceptance Criteria${EOL}- It should be awesome` ],
    [ 'Task one', '2', '1', 'Sub-task', 'Do something unexpected' ],
  ]);
});
