import markdownParse from 'remark-parse';
import unified from 'unified';
import type { Parent, Node } from 'unist';
import { select } from 'unist-util-select';
import findAllBetween from 'unist-util-find-all-between';
import findAllAfter from 'unist-util-find-all-after';
import stringify from 'remark-stringify';

import { splitOn, splitBefore } from './utils';
import type { Story, SubTask } from './story';

interface ParserOutput {
  stories: Story[],
  errors: any[],
  warnings: any[],
}

const SELECTOR = {
  SEPARATOR: 'thematicBreak',
  MAIN_HEADER: 'heading[depth=1]',
  SECOND_HEADING: 'heading[depth=1] + heading[depth=2]',
  ACCEPTANCE_HEADING: 'heading:has(text[value="Acceptance Criteria"])',
  TASKS_SECTION_HEADING: 'heading[depth=2]:has(text[value="Tasks"])',
  TASK_HEADING: 'heading[depth=3]',
};

const STRINGIFY_OPTIONS = {
  listItemIndent: '1' as '1',
};

export const parse = (markdown: string): ParserOutput => {
  const ast = markdownToAst(markdown);
  const treeList = astToTreeList(ast);
  validateStories(treeList);
  const stories = treeList.map(treeToStory);
  return {
    stories,
    errors: [],
    warnings: [],
  };
};

const astToTreeList = (ast: Parent): Parent[] =>
  ast.children
    .reduce(splitOn<Node>(node => node.type === 'thematicBreak'), [])
    .map(wrapToParent)


const treeToStory = (tree: Parent): Story => {
  const hasSubtasks = Boolean(select(SELECTOR.TASKS_SECTION_HEADING, tree));
  const title = getText(tree, SELECTOR.MAIN_HEADER);
  const valueStatement = getText(tree, SELECTOR.SECOND_HEADING);
  const description = getTextBetween(tree, SELECTOR.SECOND_HEADING, SELECTOR.ACCEPTANCE_HEADING);
  const acceptanceCriteria =
    hasSubtasks ?
    getTextBetween(tree, SELECTOR.ACCEPTANCE_HEADING, SELECTOR.TASKS_SECTION_HEADING) :
    getTextAfter(tree, SELECTOR.ACCEPTANCE_HEADING);
  const subTasks =
    hasSubtasks ?
    getSubtasks(tree) :
    [];

  return {
    title,
    valueStatement,
    subTasks,
    acceptanceCriteria,
    description,
    defintionOfDone: '',
  };
};

const validateStories = (treeList: Parent[]): void => {
  if (treeList.length === 0) {
    throw new Error('The file is empty');
  }
  treeList.forEach(validateStory);
};

const validateStory = (tree: Parent, index: number): void => {
  const line = tree.children[0]?.position?.start?.line;
  if (select(SELECTOR.MAIN_HEADER, tree) === null) {
    throw new Error(`No title in story #${index} at line: ${line}`);
  }
};

const getSubtasks = (tree: Parent): SubTask[] =>
  getSubtaskSection(tree)
    .reduce(splitBefore<Node>(node => node.type === 'heading' && node.depth === 3), [])
    .map(wrapToParent)
    .map(getSubtask);

const getSubtask = (taskTree: Parent): SubTask =>
  ({
    title: getText(taskTree, SELECTOR.TASK_HEADING),
    description: getTextAfter(taskTree, SELECTOR.TASK_HEADING),
  });

const getText = (tree: Parent, selector: string): string =>
  (select(selector + ' text', tree)?.value as string).trim();

const getTextBetween = (tree: Parent, beforeSelector: string, afterSelector: string): string => {
  const beforeNode = select(beforeSelector, tree);
  const afterNode = select(afterSelector, tree);
  const nodesBetween = findAllBetween(tree, beforeNode, afterNode);
  return nodeListToText(nodesBetween);
};

const getTextAfter = (tree: Parent, beforeSelector: string): string => {
  const beforeNode = select(beforeSelector, tree) as Node;
  const nodesAfter = findAllAfter(tree, beforeNode);
  return nodeListToText(nodesAfter);
};

const getSubtaskSection = (tree: Parent): Node[] => {
  const tasksSectionHeading = select(SELECTOR.TASKS_SECTION_HEADING, tree) as Node;
  return findAllAfter(tree, tasksSectionHeading);
};

const markdownToAst = (markdown: string): Parent =>
  unified()
    .use(markdownParse)
    .parse(markdown) as Parent;

const wrapToParent = (children: Node[]): Parent =>
  ({ type: 'root', children });

const nodeListToText = (nodes: Node[]): string =>
  unified()
    .use(stringify, STRINGIFY_OPTIONS)
    .stringify(wrapToParent(nodes))
    .trim();


