import type { Story } from './story';

const HEADER = [
  'Summary', 'Issue id', 'Parent id', 'Issue Type', 'Description'
];

export const transform = (stories: Story[]): string[][] => {
  return [ HEADER, ...stories.map(story2row) ];
}

const story2row = (story: Story, index: number): string[] => {
  return [
    story.title,
    (index + 1).toString(),
    '',
    'Story',
    `"h2.Description\n\n${story.valueStatement}\n\n${story.description}\nh2.Acceptance Criteria\n\n${story.acceptanceCriteria}"`,
  ];
};
