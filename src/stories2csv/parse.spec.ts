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
      description: 'More details',
      acceptanceCriteria: '- It should be awesome',
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
      description: 'More details\n\n- some of this\n- some of that',
      acceptanceCriteria: '- It should be awesome',
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
      description: '',
      acceptanceCriteria: '',
      defintionOfDone: '',
      subTasks: [],
    }, {
      title: 'Second Story',
      valueStatement: 'As somebody else, I can do something, so I am happy',
      description: '',
      acceptanceCriteria: '',
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
      description: '',
      acceptanceCriteria: '',
      defintionOfDone: '',
      subTasks: [],
    }, {
      title: 'Second Story',
      valueStatement: 'As somebody else, I can do something, so I am happy',
      description: '',
      acceptanceCriteria: '',
      defintionOfDone: '',
      subTasks: [],
    }, {
      title: 'Third Story',
      valueStatement: 'As somebody, I can do something else, so I am happy',
      description: '',
      acceptanceCriteria: '',
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
      description: '',
      acceptanceCriteria: '',
      defintionOfDone: '',
      subTasks: [{
        title: 'First Subtask',
        description: 'Do that!',
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
      description: '',
      acceptanceCriteria: '',
      defintionOfDone: '',
      subTasks: [{
        title: 'First Subtask',
        description: 'Do that!',
      }, {
        title: 'Second Subtask',
        description: 'Do this!',
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
      description: '',
      acceptanceCriteria: '',
      defintionOfDone: '',
      subTasks: [{
        title: 'First Subtask',
        description: 'Do that!',
      }, {
        title: 'Second Subtask',
        description: 'Do this!',
      }, {
        title: 'Third Subtask',
        description: 'Do that as well!',
      }],
    }],
    errors: [],
    warnings: [],
  });
});
