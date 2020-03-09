import { parse } from './parse';

test('parse a single story', () => {
  const markdown = `
# First Story

## As somebody, I can do something, so I am happy

More details

## Acceptance Criteria

- It should be awesome
  `;

  expect(parse(markdown)).toEqual({
    stories: [{
      title: 'First Story',
      valueStatement: 'As somebody, I can do something, so I am happy',
      description: 'More details\n',
      acceptanceCriteria: '- It should be awesome\n',
      defintionOfDone: '',
      subTasks: [],
    }],
    errors: [],
    warnings: [],
  });
});

test('parse complex description section', () => {
  const markdown = `
# First Story

## As somebody, I can do something, so I am happy

More details

- some of this
- some of that

## Acceptance Criteria

- It should be awesome
  `;

  expect(parse(markdown)).toEqual({
    stories: [{
      title: 'First Story',
      valueStatement: 'As somebody, I can do something, so I am happy',
      description: 'More details\n\n- some of this\n- some of that\n',
      acceptanceCriteria: '- It should be awesome\n',
      defintionOfDone: '',
      subTasks: [],
    }],
    errors: [],
    warnings: [],
  });
});

test('parse two stories', () => {
  const markdown = `
# First Story

## As somebody, I can do something, so I am happy

## Acceptance Criteria

---

# Second Story

## As somebody else, I can do something, so I am happy

## Acceptance Criteria
  `;

  expect(parse(markdown)).toEqual({
    stories: [{
      title: 'First Story',
      valueStatement: 'As somebody, I can do something, so I am happy',
      description: '\n',
      acceptanceCriteria: '\n',
      defintionOfDone: '',
      subTasks: [],
    }, {
      title: 'Second Story',
      valueStatement: 'As somebody else, I can do something, so I am happy',
      description: '\n',
      acceptanceCriteria: '\n',
      defintionOfDone: '',
      subTasks: [],
    }],
    errors: [],
    warnings: [],
  });
});

test('parse three stories', () => {
  const markdown = `
# First Story

## As somebody, I can do something, so I am happy

## Acceptance Criteria

---

# Second Story

## As somebody else, I can do something, so I am happy

## Acceptance Criteria

---

# Third Story

## As somebody, I can do something else, so I am happy

## Acceptance Criteria
  `;

  expect(parse(markdown)).toEqual({
    stories: [{
      title: 'First Story',
      valueStatement: 'As somebody, I can do something, so I am happy',
      description: '\n',
      acceptanceCriteria: '\n',
      defintionOfDone: '',
      subTasks: [],
    }, {
      title: 'Second Story',
      valueStatement: 'As somebody else, I can do something, so I am happy',
      description: '\n',
      acceptanceCriteria: '\n',
      defintionOfDone: '',
      subTasks: [],
    }, {
      title: 'Third Story',
      valueStatement: 'As somebody, I can do something else, so I am happy',
      description: '\n',
      acceptanceCriteria: '\n',
      defintionOfDone: '',
      subTasks: [],
    }],
    errors: [],
    warnings: [],
  });
});

test('parse single subtask', () => {
  const markdown = `
# First Story

## As somebody, I can do something, so I am happy

## Acceptance Criteria

## Tasks

### First Subtask

Do that!`;

  expect(parse(markdown)).toEqual({
    stories: [{
      title: 'First Story',
      valueStatement: 'As somebody, I can do something, so I am happy',
      description: '\n',
      acceptanceCriteria: '\n',
      defintionOfDone: '',
      subTasks: [{
        title: 'First Subtask',
        description: 'Do that!\n',
      }],
    }],
    errors: [],
    warnings: [],
  });
});

test('parse two subtasks', () => {
  const markdown = `
# First Story

## As somebody, I can do something, so I am happy

## Acceptance Criteria

## Tasks

### First Subtask

Do that!

### Second Subtask

Do this!`;

  expect(parse(markdown)).toEqual({
    stories: [{
      title: 'First Story',
      valueStatement: 'As somebody, I can do something, so I am happy',
      description: '\n',
      acceptanceCriteria: '\n',
      defintionOfDone: '',
      subTasks: [{
        title: 'First Subtask',
        description: 'Do that!\n',
      }, {
        title: 'Second Subtask',
        description: 'Do this!\n',
      }],
    }],
    errors: [],
    warnings: [],
  });
});

test('parse three subtasks', () => {
  const markdown = `
# First Story

## As somebody, I can do something, so I am happy

## Acceptance Criteria

## Tasks

### First Subtask

Do that!

### Second Subtask

Do this!

### Third Subtask

Do that as well!`;

  expect(parse(markdown)).toEqual({
    stories: [{
      title: 'First Story',
      valueStatement: 'As somebody, I can do something, so I am happy',
      description: '\n',
      acceptanceCriteria: '\n',
      defintionOfDone: '',
      subTasks: [{
        title: 'First Subtask',
        description: 'Do that!\n',
      }, {
        title: 'Second Subtask',
        description: 'Do this!\n',
      }, {
        title: 'Third Subtask',
        description: 'Do that as well!\n',
      }],
    }],
    errors: [],
    warnings: [],
  });
});

test.skip('should throw error if empty file', () => {
  expect(() => parse('')).toThrow('The file is empty');
});

test.skip('should throw error if there is no title', () => {
  expect(() => parse('something')).toThrow('No title in story #0 at line: 1');
});

/*
test('should throw error if there is no title in the second', () => {
  const markdown = `
#
  `;
  expect(() => );
});
 */
