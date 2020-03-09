export interface Task {
  title: string;
  description: string;
}

export interface Story extends Task {
  valueStatement: string;
  acceptanceCriteria: string;
  defintionOfDone: string;
  subTasks: SubTask[];
}

export interface SubTask extends Task {
}
