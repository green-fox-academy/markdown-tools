import { EOL } from 'os';
import type { Story } from './story';

const HEADER = [
  'Summary', 'Issue id', 'Parent id', 'Issue Type', 'Description'
];

const DESCRIPTION_TITLE = 'h2.Description';
const ACCEPTANCE_TITLE = 'h2.Acceptance Criteria';

const startCounter = (n: number): () => number => () => n++;

export const transform = (stories: Story[]): string[][] => {
  const counter = startCounter(1);
  return [
    HEADER,
    ...stories.flatMap((story) => story2row(story, counter))
  ];
}

const story2row = (story: Story, counter: () => number): string[][] => {
  const storyId = counter().toString();
  return [
    [
      story.title,
      storyId,
      '',
      'Story',
      getStoryDescription(story),
    ],
    ...getSubtasks({story, storyId, counter}),
  ];
};

const getStoryDescription = (story: Story) => {
  return [
   DESCRIPTION_TITLE,
   story.valueStatement,
   story.description,
   ACCEPTANCE_TITLE,
   story.acceptanceCriteria,
  ].join(EOL);
};

const getSubtasks = ({story, storyId, counter}: {story: Story, storyId: string, counter: () => number}) =>
  story.subTasks.map((task) => [
    task.title,
    counter().toString(),
    storyId,
    'Sub-task',
    task.description
  ]);
